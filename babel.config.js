const isDEV = process.env.NODE_ENV === 'development'
module.exports = {
  'presets': [
    [
      '@babel/preset-env',
      {
        'useBuiltIns': 'usage', // 根据配置的浏览器兼容，以及代码中使用到的 api 进行引入 polyfill 按需添加
        'corejs': 3 // 配置使用 core-js 低版本
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  'plugins': [
    isDEV && require.resolve('react-refresh/babel'),
    ['@babel/plugin-proposal-decorators', { 'legacy': true }]
  ].filter(Boolean)
}