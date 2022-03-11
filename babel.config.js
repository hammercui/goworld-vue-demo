/*
 * @Description: 无
 * @version: 1.0.0
 * @Company: sdbean
 * @Author: hammercui
 * @Date: 2019-12-10 16:07:34
 * @LastEditors: hammercui
 * @LastEditTime: 2020-03-03 14:57:38
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    // '@vue/app',
    // ['env',            //添加 babel-preset-env 配置
    //   {
    //     'modules': false
    //   }
    // ]
  ],
  plugins: [
    // ['import', {
    //   libraryName: 'vant',
    //   libraryDirectory: 'es',
    //   style: true
    // }, 'vant'],
    ['component',
      {
        'libraryName': 'element-ui',
        'styleLibraryName': 'theme-chalk'
      },
    ],
    [
        "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
    ]
  ]
}
