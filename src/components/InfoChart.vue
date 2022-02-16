<template>
  <div>
    <div class="tabs">
      <ul class="d-flex list-style-none">
        <li
          v-for="(item, i) in items"
          :key="i"
          @click="handleChangeTab(item.id)"
          class="tab"
          :class="{ active: activeTab === item.id }"
        >
          <span v-text="$t(item.name)" />
        </li>
      </ul>
    </div>
    <div
      ref="chartContainer"
      class="mb-4 border rounded-md-1 panel-background"
      style="height: 300px; border-top-left-radius: 0px !important"
    >
      <UiLoading v-if="loading" class="big d-flex height-full" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import * as TV from 'lightweight-charts';

const options = {
  timeScale: {
    barSpacing: 40,
    drawTicks: false,
    borderVisible: false,
    fixRightEdge: true,
    fixLeftEdge: true
  },
  grid: {
    horzLines: {
      visible: false
    },
    vertLines: {
      visible: false
    }
  },
  layout: {
    backgroundColor: 'transparent',
    textColor: 'white'
  },
  handleScroll: {
    mouseWheel: false
  },
  handleScale: {
    mouseWheel: false,
    pinch: false,
    axisPressedMouseMove: {
      time: false,
      price: false
    }
  }
};

function formatDate(date) {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

function normalizeMetrics(rawMetrics) {
  const keysByDate = Object.keys(rawMetrics);
  const metrics = {};

  for (let i = 0; i < keysByDate.length; i++) {
    const timestamp = parseFloat(keysByDate[i].split('_')[1]);
    const date = new Date(timestamp);
    const dataLengthByDate = rawMetrics[keysByDate[i]].length; // number of total pools
    if (dataLengthByDate) {
      let poolLiquidity = 0,
        poolTotalSwapFee = 0,
        poolTotalSwapVolume = 0;
      for (let j = 0; j < dataLengthByDate; j++) {
        const swaps = rawMetrics[keysByDate[i]][j].swaps;
        if (swaps.length) {
          // for (let k = 0; k < swaps.length; k++) {
          poolLiquidity += Number(swaps[0].poolLiquidity);
          poolTotalSwapFee += Number(swaps[0].poolTotalSwapFee);
          poolTotalSwapVolume += Number(swaps[0].poolTotalSwapVolume);
          metrics[formatDate(date)] = {
            poolLiquidity,
            poolTotalSwapFee,
            poolTotalSwapVolume
          };
          // }
        }
      }
    }
  }

  // calculate for last totals
  const newMetricsKeysByDate = Object.keys(metrics);
  const lastValues = metrics[newMetricsKeysByDate[0]];
  const previousValues = metrics[newMetricsKeysByDate[1]];

  const totalVolume = parseFloat(lastValues.poolTotalSwapVolume);
  const previousTotalVolume = parseFloat(previousValues.poolTotalSwapVolume);
  const lastVolume = Math.abs(totalVolume - previousTotalVolume);

  const totalFee = parseFloat(lastValues.poolTotalSwapFee);
  const previousTotalFee = parseFloat(previousValues.poolTotalSwapFee);
  const dailyFee = totalFee - previousTotalFee;
  const lastLiquidity = parseFloat(lastValues.poolLiquidity);
  const lastFee = Math.abs((dailyFee / lastLiquidity) * 365);

  return {
    metrics,
    lastMetric: {
      poolLiquidity: lastLiquidity,
      poolTotalSwapVolume: lastVolume,
      poolTotalSwapFee: lastFee
    }
  };
}

export default {
  data() {
    return {
      loading: false,
      activeTab: 'LIQUIDITY',
      metrics: {},
      chart: null,
      series: null
    };
  },
  computed: {
    items() {
      const tabList = [
        {
          name: 'liquidity',
          id: 'LIQUIDITY'
        },
        {
          name: 'volume',
          id: 'VOLUME'
        },
        {
          name: 'feeReturns',
          id: 'FEE_RETURNS'
        }
      ];
      return tabList;
    },
    chartData() {
      const data = [];

      const rowKeys = Object.keys(this.metrics);
      rowKeys.sort((a, b) => {
        return new Date(a) - new Date(b);
      });
      for (let i = 1; i < rowKeys.length; i++) {
        // const timestamp = parseFloat(rowKeys[i].split('_')[1]);
        // const date = new Date(timestamp);
        const values = this.metrics[rowKeys[i]];
        const previousValues = this.metrics[rowKeys[i - 1]];
        if (!values || !previousValues) {
          data.push({
            time: rowKeys[i] //date.toISOString()
          });
          continue;
        }
        let value;
        if (this.activeTab === 'LIQUIDITY') {
          value = parseFloat(values.poolLiquidity);
        } else if (this.activeTab === 'VOLUME') {
          const totalVolume = parseFloat(values.poolTotalSwapVolume);
          const previousTotalVolume = parseFloat(
            previousValues.poolTotalSwapVolume
          );
          value = Math.abs(totalVolume - previousTotalVolume);
        } else if (this.activeTab === 'FEE_RETURNS') {
          const totalFee = parseFloat(values.poolTotalSwapFee);
          const previousTotalFee = parseFloat(previousValues.poolTotalSwapFee);
          const dailyFee = Math.abs(totalFee - previousTotalFee);
          const liquidity = parseFloat(values.poolLiquidity);
          value = (dailyFee / liquidity) * 365;
        }

        data.push({
          time: rowKeys[i], //.toISOString(),
          value
        });
      }
      // data.sort((a, b) => {
      //   return new Date(a.time) - new Date(b.time);
      // });
      return data;
    }
  },
  methods: {
    ...mapActions(['getAllPoolsMetrics', 'getPoolsTotals']),
    handleChangeTab(tabId) {
      this.activeTab = tabId;
      this.loadChart();
    },
    async loadChart() {
      const chartContainer = this.$refs.chartContainer;
      if (!this.chart) {
        options.width = chartContainer.offsetWidth;
        options.height = chartContainer.offsetHeight;

        const theme = localStorage.getItem('themeSwitch');
        if (theme === 'light') {
          options.layout.textColor = '#90a4ae';
        } else {
          options.layout.textColor = '#90a4ae';
        }

        this.chart = TV.createChart(chartContainer, options);
        window.onresize = () => {
          const width = Math.min(
            document.body.offsetWidth,
            chartContainer.offsetWidth
          );
          this.chart.resize(width, chartContainer.offsetHeight);
        };
      } else {
        this.chart.removeSeries(this.series);
      }
      const color = '#fb6706';
      if (this.activeTab === 'LIQUIDITY') {
        this.series = this.chart.addAreaSeries({
          lineColor: color,
          topColor: `${color}ff`,
          bottomColor: `${color}00`,
          priceLineVisible: false,
          priceFormat: {
            type: 'custom',
            formatter: value => `${this._num(value, 'usd')}`
          }
        });
      } else if (this.activeTab === 'VOLUME') {
        this.series = this.chart.addHistogramSeries({
          color,
          priceFormat: {
            type: 'custom',
            formatter: value => `${this._num(value, 'usd')}`
          }
        });
      } else if (this.activeTab === 'FEE_RETURNS') {
        this.series = this.chart.addAreaSeries({
          lineColor: color,
          topColor: `${color}ff`,
          bottomColor: `${color}00`,
          priceLineVisible: false,
          priceFormat: {
            type: 'custom',
            formatter: value => `${this._num(value, 'percent')}`
          }
        });
      } else if (this.activeTab === 'PRICE') {
        this.series = this.chart.addAreaSeries({
          color: color,
          lineColor: color,
          topColor: `${color}ff`,
          bottomColor: `${color}00`,
          priceLineVisible: false,
          priceFormat: {
            type: 'custom',
            formatter: value => `${this._num(value, 'usd')}`
          }
        });
      }
      this.series.setData(this.chartData);
      this.chart.timeScale().fitContent();
    }
  },
  async mounted() {
    this.loading = true;
    const metrics = await this.getAllPoolsMetrics();
    const { metrics: normalized, lastMetric } = normalizeMetrics(metrics);
    this.metrics = normalized;
    this.getPoolsTotals(lastMetric);

    console.log(normalized);

    this.loading = false;
    await this.loadChart();
  }
};
</script>

<style lang="scss" scoped>
@import '../vars';

.tab {
  line-height: 40px;
  height: 44px;
  overflow: hidden;
  padding: 0 16px;
  border-radius: $border-radius $border-radius 0 0;
  font-size: 16px;
  color: var(--text-primary-color);
  display: block;
  cursor: pointer;
}

.tab.active {
  background-color: $blue-900;
  color: white;
}
</style>
