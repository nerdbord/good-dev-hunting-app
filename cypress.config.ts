import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/',
    env: {
      SESSION_TOKEN:
        'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..wjB3HqJY5JQOHoUj.TwcviiL4x5cX1noaNLZMn-iaAGreLvJo_IL0VdvJY_XT120Np2UfGWmIm3NjzBCDdoOAw0WMvDZ5gOLVyYdecRtW9OjrArg2RELaoQ141j2FvlOLouLE0a-UdOEWyjufM6JYuBMfDf9uSQrn4f4P4V8Hppg88K9jfxKmK9kJhcl4M0oBQD4CVE7vQpuRovRwPMf8-AYZMHhkPl9oicDYQjddgOMKaNLtQkwbtEkHNQ6nJONirSKoxSxIvERZ7lwNlI4VOI_zj9il0ljI4tQQTMyeBNUcqlM0cwvEqV_eCKosRht6WLvGuuqKxzZDsA8k-xfgN11FkRI-5K1UCGHIdEUym_LK2UTV_mEmTx8iifEwd4bIVxKQjMgbLb0ydP5WuJMvNhXNarMzcGIKT_KyGo8zGaIFJs5xWiRBmwqtQSL71llLs0O53osgYY_yVw.km_KRXAD_N9XVWXGLuxryw',
    },
  },
})
