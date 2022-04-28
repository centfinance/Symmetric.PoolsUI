export const BAL_TOKEN = {
  1: '0x57dB3FfCa78dBbE0eFa0EC745D55f62aa0Cbd345',
  42: '0xfB66054D9C7b357b3134Dc47eD54EddAcc012f44', // kovan
  100: '0xC45b3C1c24d5F54E7a2cF288ac668c74Dd507a84', // xdai
  42220: '0x7c64ad5f9804458b8c9f93f7300c15d55956ac2a', // celo
  77: '', // sokol reward token
  44787: '' // alfajores reward token
};

export const SYMM_TOKENS = {
  v1: '0x7c64ad5f9804458b8c9f93f7300c15d55956ac2a',
  v2: '0x8427bD503dd3169cCC9aFF7326c15258Bc305478'
};

export const uncappedTokens = {
  1: [
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
    '0xba100000625a3754423978a60c9317c58a424e3D', // SYMM
    '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI
    '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
    '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599' // WBTC
  ],
  10: [
    '0x350a791bfc2c21f9ed5d10980dad2e2638ffa7f6', // LINK
    '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1', // DAI.e
    '0x4200000000000000000000000000000000000006', // WETH
    '', // SYMM
    '0x8700daec35af8ff88c16bdf0418774cb3d7599b4', // SNX
    '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58', // USDT
    '0x7f5c764cbc14f9669b88837ca1490cca17c31607', //USDC
    '0x68f180fcce6836688e9084f035309e29bf0a2095' // WBTC
  ],
  42: [
    '0xd0A1E359811322d97991E03f863a0C30C2cF029C', // WETH
    '0xfc1a1381b3f63f3becc2990100e3c94fe4fdffdc', // SYMM
    '0x1528F3FCc26d13F7079325Fb78D9442607781c8C', // DAI
    '0x2F375e94FC336Cdec2Dc0cCB5277FE59CBf1cAe5', // USDC
    '0xe0C9275E44Ea80eF17579d33c55136b7DA269aEb' // WBTC
  ],
  77: [
    '0xB7c91068aC96051573465E43603600C0684a7002', // WETH
    '0xc655c6D80ac92d75fBF4F40e95280aEb855B1E87', // WSPOA
    '0x705581f5830Cfd11715020543f5309ADEBdbd074' // WXDAI
    // '0x408eC1Bb883dA0EA0fb3C955ea6BEfcd05Aa7C3A' // STAKE
    // '0x58fC59fa03ed9e24bF9e2243736b69301f521D43' // LINK
  ],
  100: [
    '0x6a023ccd1ff6f2045c3309768ead9e68f978f6e1', // WETH
    '0xc45b3c1c24d5f54e7a2cf288ac668c74dd507a84', // SYMM
    '0x44fa8e6f47987339850636f88629646662444217', // DAI
    '0xddafbb505ad214d7b80b1f830fccc89b60fb7a83', // USDC
    '0x8e5bbbb09ed1ebde8674cda39a0c169401db4252', // WBTC
    '0xe91d153e0b41518a2ce8dd3d7944fa863463a97d', // WXDAI
    '0x2bf2ba13735160624a0feae98f6ac8f70885ea61', // FRACTION
    '0x3a97704a1b25f08aa230ae53b352e2e72ef52843', // AGVE
    '0x4ecaba5870353805a9f068101a40e0f32ed605c6', // USDT
    '0x63e62989d9eb2d37dfdb1f93a22f063635b07d51', // MIVA
    '0x6b0f8a3fb7cb257ad7c72ada469ba1d3c19c5094', // RXDAI
    '0x71850b7e9ee3f13ab46d67167341e4bdc905eef9', // HNY
    '0xb7d311e2eb55f2f68a9440da38e7989210b9a05e', // STAKE
    '0xd51e1ddd116fff9a71c1b8feeb58113afa2b4d93', // AMIS
    '0xd87fcb23da48d4d9b70c6f39b46debb5d993ad19', // HBTC
    '0x22bd2a732b39dace37ae7e8f50a186f3d9702e87', // yDAI+yUSDC+yUSDT+yTUSD
    '0x9c58bacc331c9aa871afd802db6379a98e80cedb' // GNO
  ],
  137: [
    '0x3BA4c387f786bFEE076A58914F5Bd38d668B42c3', // BNB
    '0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39', // LINK
    '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063', // DAI
    '0x45c32fa6df82ead1e2ef74d17b76547eddfaff89', // FRAX
    '0x1a3acf6d19267e2d3e7f898f42803e90c9219062', // FXS
    '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270', // WMATIC
    '0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a', // SUSHI
    '', // SYMM
    '0xc2132d05d31c914a87c6611c10748aeb04b58e8f', // USDT
    '0x2e1ad108ff1d8c782fcbbb89aad783ac49586756', // TUSD
    '0x2791bca1f2de4661ed88a30c99a7a9449aa84174', // USDC
    '0xb33eaad8d922b1083446dc23f610c2567fb5180f', // UNI
    '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6' // WBTC
  ],
  250: [
    '0x2DEf4285787d58a2f811AF24755A8150622f4361', // ICE
    '0x841fad6eae12c286d1fd18d1d525dffa75c7effe', // BOO
    '', // SYMM
    '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83' // WFTM
  ],
  42220: [
    '0x2def4285787d58a2f811af24755a8150622f4361', // cETH
    '0x471ece3750da237f93b8e339c536989b8978a438', // CELO
    '0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73', // cEUR
    '0x765de816845861e75a25fca122bb6898b8b1282a', // cUSD
    '0xd629eb00deced2a080b7ec630ef6ac117e614f1b', // cBTC
    '0xa8d0e6799ff3fd19c6459bf02689ae09c4d78ba7', // mcEUR
    '0x64defa3544c695db8c535d289d843a189aa26b98', // mcUSD
    '0x00be915b9dcf56a3cbe739d9b9c202ca692409ec', // UBE
    '0x1a8dbe5958c597a744ba51763abebd3355996c3e', // rCELO
    '0x7037f7296b2fc7908de7b57a89efaa8319f0c500', // mCELO
    '0x7c64ad5f9804458b8c9f93f7300c15d55956ac2a', // SYMM v1
    '0x8427bD503dd3169cCC9aFF7326c15258Bc305478' // SYMM v2
  ],
  43114: [
    '0x5947bb275c521040051d82396192181b413227a3', // LINK.e
    '0xd586e7f844cea2f87f50152665bcbc2c279d8d70', // DAI.e
    '0xd24c2ad096400b6fbcd2ad8b24e7acbc21a1da64', // FRAX
    '0x214db107654ff987ad859f34125307783fc8e387', // SUSHI
    '', // SYMM
    '0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7', // USDT
    '0xc7198437980c041c805a1edcba50c1ce5db95118', // USDT.e
    '0x1c20e891bab6b1727d14da358fae2984ed9b59eb', // TUSD
    '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7', // WAVAX
    '0x408d4cd0adb7cebd1f1a1c33a0ba2098e1295bab' // WBTC
  ],
  44787: [
    '0xf194afdf50b03e69bd7d057c1aa9e10c9954e4c9', // CELO
    '0x10c892a6ec43a53e45d0b916b4b7d383b1b78c0f', // cEUR
    '0x874069fa1eb16d44d622f2e0ca25eea172369bc1' // cUSD
  ],
  43113: [
    '0xafda926d549a67229d8db529638e0bafcdb66458',
    '0xd00ae08403b9bbb9124bb305c09058e32c39a48c',
    '0x29d861c32f28112547cf5e2d7487b33506570981',
    '0x969771454b8a9b40e5578d38f16c91313fa67baf'
  ],
  4002: [
    '0xa5afdcaad3e67261e2dee707476699ef968cf57c',
    '0x2d7cd0f70bd71c6bc382cfc752972f41f1f0acd6',
    '0x1957d5e8496628d755a4b2151bca03ecc379bdd6'
  ],
  69: [
    '0x4200000000000000000000000000000000000006',
    '0x7f5c764cbc14f9669b88837ca1490cca17c31607',
    '0x1147b3f6eca313a5b3c2aa3fb85928104a5787d3',
    '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58'
  ],
  80001: [
    '0xaff77c74e2a3861225173c2325314842338b73e6',
    '0xda53403df5ff2058feb9c6729fafb3996b84545b'
  ]
};

export const equivalentSets = {
  1: [
    [
      [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
        '0x3a3A65aAb0dd2A17E3F1947bA16138cd37d08c04', // aETH
        '0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5', // cETH
        '0x77f973FCaF871459aa58cd81881Ce453759281bC', // iETH
        '0xf53AD2c6851052A81B42133467480961B2321C09', // PETH
        '0xE0B7927c4aF23765Cb51314A0E0521A9645F0E2A', // DGD
        '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359' // SAI
      ],
      [
        '0x5e74C9036fb86BD7eCdcb084a0673EFc32eA31cb' // sETH
      ]
    ],
    [
      [
        '0x4Fabb145d64652a948d72533023f6E7A623C7C53', // BUSD
        '0x6Ee0f7BB50a54AB5253dA0667B0Dc2ee526C30a8' // aBUSD
      ],
      [
        '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI
        '0xfC1E690f61EFd961294b3e1Ce3313fBD8aa4f85d', // aDAI
        '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643', // cDAI
        '0x493C57C4763932315A328269E1ADaD09653B9081', // iDAI
        '0x261b45D85cCFeAbb11F022eBa346ee8D1cd488c0', // rDAI
        '0x16de59092dAE5CcF4A1E6439D611fd0653f0Bd01', // yDAI
        '0x06AF07097C9Eeb7fD685c692751D5C66dB49c215' // CHAI
      ],
      [
        '0x5BC25f649fc4e26069dDF4cF4010F9f706c23831' // DUSD
      ],
      [
        '0x056Fd409E1d7A124BD7017459dFEa2F387b6d5Cd' // GUSD
      ],
      [
        '0xe2f2a5C287993345a840Db3B0845fbC70f5935a5' // mUSD
      ],
      [
        '0xDaFF85B6f5787b2d9eE11CCDf5e852816063326A' // pxUSD-OCT2020
      ],
      [
        '0xF06DdacF71e2992E2122A1a0168C6967aFdf63ce' // uUSDrBTC-DEC
      ],
      [
        '0xD16c79c8A39D44B2F3eB45D2019cd6A42B03E2A9' // uUSDwETH-DEC
      ],
      [
        '0x81ab848898b5ffD3354dbbEfb333D5D183eEDcB5' // yUSD-SEP20
      ],
      [
        '0xB2FdD60AD80ca7bA89B9BAb3b5336c2601C020b4' // yUSD-OCT20
      ],
      [
        '0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8', // yCRV
        '0x5dbcF33D8c2E976c6b560249878e6F1491Bca25c' // yyCRV
      ],
      [
        '0x8E870D67F660D95d5be530380D0eC0bd388289E1' // PAX
      ],
      [
        '0x196f4727526eA7FB1e17b2071B3d8eAA38486988' // RSV
      ],
      [
        '0x57Ab1ec28D129707052df4dF418D58a2D46d5f51', // sUSD
        '0x625aE63000f46200499120B906716420bd059240', // aSUSD
        '0x49f4592E641820e928F9919Ef4aBd92a719B4b49' // iSUSD
      ],
      [
        '0x0000000000085d4780B73119b644AE5ecd22b376', // TUSD
        '0x4DA9b813057D04BAef4e5800E36083717b4a0341' // aTUSD
      ],
      [
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
        '0x9bA00D6856a4eDF4665BcA2C2309936572473B7E', // aUSDC
        '0x39AA39c021dfbaE8faC545936693aC917d5E7563', // cUSDC
        '0xF013406A0B1d544238083DF0B93ad0d2cBE0f65f', // iUSDC
        '0xd6aD7a6750A7593E092a9B218d66C0A814a3436e' // yUSDC
      ],
      [
        '0x71fc860F7D3A592A4a98740e39dB31d25db65ae8', // aUSDT
        '0xf650C3d88D12dB855b8bf7D11Be6C55A4e07dCC9' // cUSDT
      ],
      [
        '0x9A48BD0EC040ea4f1D3147C025cd4076A2e71e3e' // USD++
      ],
      [
        '0x4954Db6391F4feB5468b6B943D4935353596aEC9' // USDQ
      ]
    ],
    [
      [
        '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', // WBTC
        '0xFC4B8ED459e00e5400be803A9BB3954234FD50e3', // aWBTC
        '0xC11b1268C1A384e55C48c2391d8d480264A3A7F4', // cWBTC
        '0xBA9262578EFef8b3aFf7F60Cd629d6CC8859C8b5' // iWBTC
      ],
      [
        '0x0327112423F3A68efdF1fcF402F6c5CB9f7C33fd' // BTC++
      ],
      [
        '0x3212b29E33587A00FB1C83346f5dBFA69A458923' // imBTC
      ],
      [
        '0x5228a22e72ccC52d415EcFd199F99D0665E7733b' // pBTC
      ],
      [
        '0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D' // renBTC
      ],
      [
        '0xfE18be6b3Bd88A2D2A7f928d00292E7a9963CfC6' // sBTC
      ],
      [
        '0x8dAEBADE922dF735c38C80C7eBD708Af50815fAa' // TBTC
      ]
    ],
    [
      [
        '0x0D8775F648430679A709E98d2b0Cb6250d2887EF', // BAT
        '0xE1BA0FB44CCb0D11b80F92f4f8Ed94CA3fF51D00', // aBAT
        '0x6C8c6b02E7b2BE14d4fA6022Dfd6d75921D90E4E' // cBAT
      ]
    ],
    [
      [
        '0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c', // ENJ
        '0x712DB54daA836B53Ef1EcBb9c6ba3b9Efb073F40' // aENJ
      ]
    ],
    [
      [
        '0xdd974D5C2e2928deA5F71b9825b8b646686BD200', // KNC
        '0x9D91BE44C06d373a8a226E1f3b146956083803eB', // aKNC
        '0x1cC9567EA2eB740824a45F8026cCF8e46973234D' // iKNC
      ]
    ],
    [
      [
        '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9', // AAVE
        '0x7D2D3688Df45Ce7C552E19c27e007673da9204B8' // aLEND
      ]
    ],
    [
      [
        '0x514910771AF9Ca656af840dff83E8264EcF986CA', // LINK
        '0xA64BD6C70Cb9051F6A9ba1F163Fdc07E0DfB5F84', // aLINK
        '0x1D496da96caf6b518b133736beca85D5C4F9cBc5' // iLINK
      ],
      [
        '0xbBC455cb4F1B9e4bFC4B73970d360c8f032EfEE6' // sLINK
      ]
    ],
    [
      [
        '0x0F5D2fB29fb7d3CFeE444a200298f468908cC942', // MANA
        '0x6FCE4A401B6B80ACe52baAefE4421Bd188e76F6f' // aMANA
      ]
    ],
    [
      [
        '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2', // MKR
        '0x7deB5e830be29F91E298ba5FF1356BB7f8146998' // aMKR
      ]
    ],
    [
      [
        '0x408e41876cCCDC0F92210600ef50372656052a38', // REN
        '0x69948cC03f478B95283F7dbf1CE764d0fc7EC54C' // aREN
      ]
    ],
    [
      [
        '0x221657776846890989a759ba2973e427dff5c9bb', // REPv2
        '0x71010A9D003445aC60C4e6A7017c1E89A477B438', // aREP
        '0x158079Ee67Fce2f58472A96584A73C7Ab9AC95c1', // cREP
        '0xBd56E9477Fc6997609Cf45F84795eFbDAC642Ff1' // iREP
      ]
    ],
    [
      [
        '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F', // SNX
        '0x328C4c80BC7aCa0834Db37e6600A6c49E12Da4DE' // aSNX
      ]
    ],
    [
      [
        '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', // UNI
        '0x35A18000230DA775CAc24873d00Ff85BccdeD550' // cUNI
      ]
    ],
    [
      [
        '0xE41d2489571d322189246DaFA5ebDe1F4699F498', // ZRX
        '0x6Fb0855c404E09c47C3fBCA25f08d4E41f9F062f', // aZRX
        '0xB3319f5D18Bc0D84dD1b4825Dcde5d5f7266d407', // cZRX
        '0xA7Eb2bc82df18013ecC2A6C533fc29446442EDEe' // iZRX
      ]
    ]
  ],
  42: [
    [
      [
        '0xd0A1E359811322d97991E03f863a0C30C2cF029C', // WETH
        '0xd483b49f2d55d2c53d32be6eff735cb001880f79', // aETH
        '0x41b5844f4680a8c38fbb695b7f9cfd1f64474a72', // cETH
        '0x54be07007c680ba087b3fcd8e675d1c929b6aaf5', // iETH?
        '0x7b5ce9bd4d38d250ee86d54f7c683989b1b6bbc5', // PETH
        '0xe8a72c46ec0b4b028020895247c306e05d5a671c', // DGD
        '0x81f1fc45fa9aedb96f39c0ae2e77fa623aaa9a8c' // SAI
      ],
      [
        '0x0ec0a24cf31034fa22585e4773842610725c9003' // sETH?
      ]
    ],
    [
      [
        '0x4c6e1efc12fdfd568186b7baec0a43fffb4bcccf', // BUSD
        '0xe90e418937940b2c4fd1aa91fa43e593f25dac08' // aBUSD
      ],
      [
        '0x1528F3FCc26d13F7079325Fb78D9442607781c8C', // DAI
        '0x4ef54e8babba6debef999bdf64878e39fb04a11f', // aDAI
        '0xf0d0eb522cfa50b716b3b1604c4f0fa6f04376ad', // cDAI
        '0xf5f4047612b43d76d5a55521c622a1d42e585476', // iDAI
        '0x3183683ceeab01699722053a2cb6a945ce0d7cec', // rDAI
        '0x311dc257097b3b1cc82582aa929cf739e1782204' // yDAI?
        //'0x06AF07097C9Eeb7fD685c692751D5C66dB49c215', // CHAI?
      ],
      [
        '0x54b909745294bf82d36845ee69c1daaddbe14978' // DUSD?
      ],
      [
        '0xafbbb0875bb95c4983253effe4e0fffe1c544633' // GUSD
      ],
      [
        '0xc2f4bac7c556cd87520735c6a69641db9edefaf1' // mUSD
      ],
      [
        '0x7a67cf3f738739f02015c279d73f77d3b4380b28' // pxUSD-OCT2020
      ],
      [
        '0xb021c4ec80944127de40e7f794c04f352f60775b' // uUSDrBTC-NOV (not DEC)
      ],
      /*[
            '0xD16c79c8A39D44B2F3eB45D2019cd6A42B03E2A9', // uUSDwETH-DEC
        ],*/
      [
        '0x2175972a1908230d55738276e99ece201ac05c27' // yUSD-SEP20
      ],
      /*[
            '0xB2FdD60AD80ca7bA89B9BAb3b5336c2601C020b4', // yUSD-OCT20
        ],*/
      [
        '0x5d6d4355776fffd46d83dcedb8156d65c152a4ba' // yCRV
        //'0x5dbcF33D8c2E976c6b560249878e6F1491Bca25c', // yyCRV
      ],
      [
        '0xbf594a26f81451164308a4e132ff6befdc2d9744' // PAX
      ],
      /*[
            '0x196f4727526eA7FB1e17b2071B3d8eAA38486988', // RSV
        ],*/
      [
        '0x559e848a1b6a7afc69ee27f8d20280a42628b2cf', // sUSD
        '0x28c7fcf58924a077a1fbdeab322eef840ca0ed9c', // aSUSD
        '0x1cac31ecc90912eea18ccadfab15fd9c0e77cbab' // iSUSD
      ],
      [
        '0x1784e824fe8cfca87719fb183273948bdd99ca0b', // TUSD
        '0xef7333012c5a53eedef10b1feb11a9a4723df279' // aTUSD
      ],
      [
        '0x2F375e94FC336Cdec2Dc0cCB5277FE59CBf1cAe5', // USDC
        '0x2F375e94FC336Cdec2Dc0cCB5277FE59CBf1cAe5', // aUSDC
        '0x286cede2c01cc9700b4357cf11038f635fb770ee', // cUSDC
        '0xe83cae7d71483f8987a278ee62525092902d7705', // iUSDC
        '0xbd40ec2839fd401b87320e0324ff419bfcc56308' // yUSDC
      ],
      [
        '0x2519d378a2fb4b5518f212c749ed175532e4bf3d', // aUSDT
        '0x644464c679a95bf306a45b1e322a794bb56ffd4d' // cUSDT
      ]
      /*[
            '0x9A48BD0EC040ea4f1D3147C025cd4076A2e71e3e', // USD++
        ],
        [
            '0x4954Db6391F4feB5468b6B943D4935353596aEC9', // USDQ
        ],*/
    ],
    [
      [
        '0xe0C9275E44Ea80eF17579d33c55136b7DA269aEb', // WBTC
        '0xf203114673af345614cd5edffac13709f94ce4d3', // aWBTC
        '0xa1faa15655b0e7b6b6470ed3d096390e6ad93abb', // cWBTC
        '0x73d4b4ab88eab2a1e6ce495de85c2b04c2918b69' // iWBTC
      ],
      [
        '0x64fee3cd491a4fd01ba125959ec52ceb618e9b5a' // BTC++
      ],
      [
        '0xb9da34c1701480f68fe32e696f0e5a7bff43f8db' // imBTC
      ],
      [
        '0xe0b6c808d6e32a964d338f4a7f588f573d91c98f' // pBTC
      ],
      [
        '0x2426c4aaf20dd4501709dda05d79ebc552d3ae3e' // renBTC
      ],
      [
        '0x9db7ea2837ccb1340b92551feeffbb1d9ae41bbc' // sBTC
      ],
      [
        '0xac69f0b7875658daae2c7a4137fd58c1ab5c0a60' // TBTC
      ]
    ],
    [
      [
        '0x1f1f156E0317167c11Aa412E3d1435ea29Dc3cCE', // BAT
        '0x9df88ec71487b2f85d8bf096a0affa46c4338820', // aBAT
        '0x4a77faee9650b09849ff459ea1476eab01606c7a' // cBAT
      ]
    ],
    [
      [
        '0xf6fe970533fe5c63d196139b14522eb2956f8621' // ENJ
        //'0x712DB54daA836B53Ef1EcBb9c6ba3b9Efb073F40', // aENJ
      ]
    ],
    [
      [
        '0x9da22569e51a44281f4eef072fbe2ae6a6391a63', // KNC
        '0xb08ec9edb6bd7971220fea04644174f3ebfbde96', // aKNC
        '0xde7a60c3581f0d8c8723a71c28579131984a410c' // iKNC
      ]
    ],
    [
      [
        '0x767fd0b58852ff162cfac5072592cb04cbf3a51e', // AAVE
        '0xcba131c7fb05fe3c9720375cd86c99773faabf23' // aLEND
      ]
    ],
    [
      [
        '0x497a3dd7165869efc68ae0394ba19bce6ad5ae1b', // LINK
        '0x91034833923f32d548d375a0bb24457cb11db22a', // aLINK
        '0x21dc51dd8bffece537eff6fbab3d1c82340b0a40' // iLINK
      ],
      [
        '0x3a4a90a2d8cba26f2e32c4a6e6d01ffbfce8dbb4' // sLINK
      ]
    ],
    [
      [
        '0x221f4d62636b7b51b99e36444ea47dc7831c2b2f', // MANA
        '0xe68204d69cbfaf6124190efa65ad9c591c0d48e4' // aMANA
      ]
    ],
    [
      [
        '0xef13C0c8abcaf5767160018d268f9697aE4f5375', // MKR
        '0xfb762b5bab463f7f35610ba65e2534993a1c09c6' // aMKR
      ]
    ],
    [
      [
        '0x203056b273a60ca45a5c5f4c63691ead43a107ea' // REN
        //'0x69948cC03f478B95283F7dbf1CE764d0fc7EC54C', // aREN
      ]
    ],
    [
      [
        '0xdfce74ee5309b7a9f44727c7a2a8f17db0f31003', // REPv2
        '0x0578469469db1129271f4eb3eb9d97426506c44c', // aREP
        '0xa4ec170599a1cf87240a35b9b1b8ff823f448b57', // cREP
        '0x8638b468bf02bdb8fc8c5b33dca8c2d16c3fd67b' // iREP
      ]
    ],
    [
      [
        '0x86436BcE20258a6DcfE48C9512d4d49A30C4d8c4', // SNX
        '0xb4d480f963f4f685f1d51d2b6159d126658b1da8' // aSNX
      ]
    ],
    [
      [
        '0xff3c80d35fbcb0ebdba0c2235eba1c147dda1f04' // UNI
        //'0x35A18000230DA775CAc24873d00Ff85BccdeD550', // cUNI
      ]
    ],
    [
      [
        '0xda44108a60d411b129bcf953a99013e8e4af7503', // ZRX
        '0x3b9743c458ae58c30069d14e98a2745ad3982480', // aZRX
        '0xc014dc10a57ac78350c5fddb26bb66f1cb0960a0', // cZRX
        '0xbac711d9963f0db23613f3c338a7a1af151c0696' // iZRX
      ]
    ]
  ],
  77: [],
  100: [
    [
      [
        '0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83', // USDC
        '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d' // WXDAI
      ]
    ]
  ],
  42220: [
    [
      [
        '0xD629eb00dEced2a080B7EC630eF6aC117e614f1b', // cBTC
        '0xBe50a3013A1c94768A1ABb78c3cB79AB28fc1aCE' // WBTC
      ]
    ],
    [
      [
        '0x2DEf4285787d58a2f811AF24755A8150622f4361', // cETH
        '0xE919F65739c26a42616b7b8eedC6b5524d1e3aC4' // WETH
      ]
    ]
  ],
  44787: [],
  4002: [],
  43113: [],
  69: [],
  80001: []
};
