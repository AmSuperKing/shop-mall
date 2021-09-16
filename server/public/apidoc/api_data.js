define({ "api": [
  {
    "type": "get",
    "url": "/api/v2/goods/typeList",
    "title": "获取产品分类信息",
    "description": "<p>获取产品分类信息</p>",
    "name": "获取产品分类信息/api/v2/goods/typeList",
    "group": "产品信息模块",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": "<p>响应格式</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": 200,\n    \"message\": \"获取数据成功\",\n    \"data\": [{\n      ...\n    }]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "filename": "routes/home.js",
    "groupTitle": "产品信息模块",
    "sampleRequest": [
      {
        "url": "http://192.168.40.83:3000/api/v2/goods/typeList"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v2/goods/getMainTypes",
    "title": "获取产品分类大类",
    "description": "<p>获取产品分类大类</p>",
    "name": "获取产品分类大类/api/v2/goods/getMainTypes",
    "group": "产品信息模块",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": "<p>响应格式</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": 200,\n    \"message\": \"获取数据成功\",\n    \"data\": [{\n      ...\n    }]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "filename": "routes/home.js",
    "groupTitle": "产品信息模块",
    "sampleRequest": [
      {
        "url": "http://192.168.40.83:3000/api/v2/goods/getMainTypes"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v2/goods/getSubTypes",
    "title": "获取产品分类小类",
    "description": "<p>获取产品分类小类</p>",
    "name": "获取产品分类小类/api/v2/goods/getSubTypes",
    "group": "产品信息模块",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": "<p>响应格式</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": 200,\n    \"message\": \"获取数据成功\",\n    \"data\": [{\n      ...\n    }]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "filename": "routes/home.js",
    "groupTitle": "产品信息模块",
    "sampleRequest": [
      {
        "url": "http://192.168.40.83:3000/api/v2/goods/getSubTypes"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/v2/goods/recommend",
    "title": "获取产品推荐",
    "description": "<p>获取产品推荐</p>",
    "name": "获取产品推荐/api/v2/goods/recommend",
    "group": "产品信息模块",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": "<p>响应格式</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": 200,\n    \"message\": \"获取数据成功\",\n    \"data\": [{\n      ...\n    }]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "filename": "routes/home.js",
    "groupTitle": "产品信息模块",
    "sampleRequest": [
      {
        "url": "http://192.168.40.83:3000/api/v2/goods/recommend"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/v2/search/getGoodsDetail",
    "title": "获取商品详情信息",
    "description": "<p>获取商品详情信息</p>",
    "name": "获取商品详情信息/api/v2/search/getGoodsDetail",
    "group": "产品信息模块",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "goodsId",
            "description": "<p>商品id, body参数</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": "<p>响应格式</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": 200,\n    \"message\": \"获取数据成功\",\n    \"data\": {\n      ...\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "filename": "routes/search.js",
    "groupTitle": "产品信息模块",
    "sampleRequest": [
      {
        "url": "http://192.168.40.83:3000/api/v2/search/getGoodsDetail"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v2/goods/getBriefInfo",
    "title": "获取热销/新品/精选/超值概略信息",
    "description": "<p>获取热销/新品/精选/超值概略信息</p>",
    "name": "获取热销/新品/精选/超值概略信息/api/v2/goods/getBriefInfo",
    "group": "产品信息模块",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": "<p>响应格式</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": 200,\n    \"message\": \"获取数据成功\",\n    \"data\": {\n      ...\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "filename": "routes/home.js",
    "groupTitle": "产品信息模块",
    "sampleRequest": [
      {
        "url": "http://192.168.40.83:3000/api/v2/goods/getBriefInfo"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v2/goods/getTopSell",
    "title": "获取热销排行数据",
    "description": "<p>获取热销排行数据</p>",
    "name": "获取热销排行数据/api/v2/goods/getTopSell",
    "group": "产品信息模块",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": "<p>响应格式</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": 200,\n    \"message\": \"获取数据成功\",\n    \"data\": [{\n      ...\n    }]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "filename": "routes/goods.js",
    "groupTitle": "产品信息模块",
    "sampleRequest": [
      {
        "url": "http://192.168.40.83:3000/api/v2/goods/getTopSell"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v2/goods/getSaleTypeInfo",
    "title": "获取销售类信息",
    "description": "<p>获取销售类信息</p>",
    "name": "获取销售类信息/api/v2/goods/getSaleTypeInfo",
    "group": "产品信息模块",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": "<p>响应格式</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": 200,\n    \"message\": \"获取数据成功\",\n    \"data\": [{\n      ...\n    }]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "filename": "routes/home.js",
    "groupTitle": "产品信息模块",
    "sampleRequest": [
      {
        "url": "http://192.168.40.83:3000/api/v2/goods/getSaleTypeInfo"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v2/goods/getSaleTypeItem",
    "title": "获取销售类详细信息",
    "description": "<p>获取销售类详细信息</p>",
    "name": "获取销售类详细信息/api/v2/goods/getSaleTypeItem",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>销售类id,query参数</p>"
          }
        ]
      }
    },
    "group": "产品信息模块",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": "<p>响应格式</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": 200,\n    \"message\": \"获取数据成功\",\n    \"data\": {\n      ...\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "filename": "routes/home.js",
    "groupTitle": "产品信息模块",
    "sampleRequest": [
      {
        "url": "http://192.168.40.83:3000/api/v2/goods/getSaleTypeItem"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v2/goods/getNewProductBanner",
    "title": "获取新品首发banner",
    "description": "<p>获取新品首发banner</p>",
    "name": "获取新品首发banner/api/v2/goods/getNewProductBanner",
    "group": "信息模块",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": "<p>响应格式</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": 200,\n    \"message\": \"获取数据成功\",\n    \"data\": {\n      ...\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "filename": "routes/info.js",
    "groupTitle": "信息模块",
    "sampleRequest": [
      {
        "url": "http://192.168.40.83:3000/api/v2/goods/getNewProductBanner"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/v2/search/searchGoods",
    "title": "根据关键词搜索商品",
    "description": "<p>根据关键词搜索商品</p>",
    "name": "根据关键词搜索商品/api/v2/search/searchGoods",
    "group": "搜索模块",
    "parameter": {
      "fields": {
        "query": [
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "search",
            "description": "<p>搜索词,query参数</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": "<p>响应格式</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": 200,\n    \"message\": \"获取数据成功\",\n    \"data\": [{\n      ...\n    }]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "filename": "routes/search.js",
    "groupTitle": "搜索模块",
    "sampleRequest": [
      {
        "url": "http://192.168.40.83:3000/api/v2/search/searchGoods"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v2/search/hotWord",
    "title": "获取热搜词",
    "description": "<p>获取热搜词</p>",
    "name": "获取热搜词/api/v2/search/hotWord",
    "group": "搜索模块",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": "<p>响应格式</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": 200,\n    \"message\": \"获取数据成功\",\n    \"data\": [{\n      ...\n    }]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "filename": "routes/search.js",
    "groupTitle": "搜索模块",
    "sampleRequest": [
      {
        "url": "http://192.168.40.83:3000/api/v2/search/hotWord"
      }
    ]
  },
  {
    "type": "post",
    "url": "/login",
    "title": "用户登录",
    "description": "<p>用户登录</p>",
    "name": "登录login",
    "group": "用户登录模块",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名，body参数发送</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码，body参数发送</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": "<p>响应格式</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": 200,\n    \"message\": \"登录成功\",\n    \"data\" : {\n        \"token\": \"...\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "filename": "routes/login.js",
    "groupTitle": "用户登录模块",
    "sampleRequest": [
      {
        "url": "http://192.168.40.83:3000/login"
      }
    ]
  },
  {
    "type": "get",
    "url": "/login/getUserInfo",
    "title": "获取当前登录信息",
    "description": "<p>获取当前登录信息</p>",
    "name": "获取当前登录信息/login/getUserInfo",
    "group": "用户登录模块",
    "header": {
      "fields": {
        "headers": [
          {
            "group": "headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>token，附带请求头</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": "<p>响应格式</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": 200,\n    \"message\": \"查询成功\",\n    \"data\": {\n      ...\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "filename": "routes/login.js",
    "groupTitle": "用户登录模块",
    "sampleRequest": [
      {
        "url": "http://192.168.40.83:3000/login/getUserInfo"
      }
    ]
  }
] });
