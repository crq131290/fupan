var ourApp = angular.module("ourApp");
/**
 * 程荣强
 * 全局变量menu
 * 导航栏
 * @property{string} menu.sub.url  -- 值为全局路由中state名称
 */
 
//mainMenu
// ourApp.value('navMenu',[
//     { id:1, name: "欢迎页面", sub:[]},
//     { id:2, name: "业务页面", sub:[]},
//     { id:3, name: "内容管理", sub:[]},
//     { id:4, name: "用户管理", sub:[]},
//     { id:5, name: "后台管理", sub:[]}
// ]);

// //subMenu
// ourApp.value('menuUrl',[
//     {id:1, url: "backhome.welcome"},
//     {id:2, url: "backhome.article"},
//     {id:3, url: "backhome.vedio"},
//     {id:4, url: "backhome.forum"},
//     {id:5, url: "backhome.treeHole"},
//     {id:6, url: "backhome.banner"},
//     {id:7, url: "backhome.pubNotice"},
//     {id:8, url: "backhome.subject"},
//     {id:9, url: "backhome.user"},
//     {id:10, url: "backhome.account"},
//     {id:11, url: "backhome.role"},
//     {id:12, url: "backhome.modify"},
//     {id:13, url: "backhome.module"}
// ])


ourApp.value('navWel',
        {
            id:-1,
            name:"欢迎页面",
            sub:[{
                id:-1,moduleUrl:".welcome",name:"欢迎页面",parentId:-1
            }]
        })

// ourApp.value('navMenu', [
//         {
//             id:1,
//             name:"欢迎页面",
//             sub:[{
//                 id:0,
//                 name:'欢迎页面',
//                 url: "backhome.welcome"
//             }]
//         },
//         {
//             id:2,
//             name:'业务管理',
//             sub:[
//                 {
//                     id:1,
//                     name:'文章管理',
//                     url:'backhome.article'
//                 },
//                 {
//                     id:2,
//                     name:'视频管理',
//                     url:'backhome.video'
//                 },
//                 {
//                     id:3,
//                     name:'论坛管理',
//                     url:'backhome.forum'
//                 },
//                 {
//                     id:4,
//                     name:'树洞管理',
//                     url:'backhome.treeHole'
//                 }
//             ]

//         },
//         {
//             id:3,
//             name:'内容管理',
//             sub:[
//                 {
//                     id:5,
//                     name:'图片管理',
//                     url:'backhome.banner'
//                 },
//                 {
//                     id:6,
//                     name:'公告管理',
//                     url:'backhome.pubNotice'
//                 },
//                 {
//                     id:7,
//                     name:'科目管理',
//                     url:'backhome.subject'
//                 }
//             ]

//         },
//         {
//             id:4,
//             name:'用户管理',
//             sub:[
//             {
//                 id:8,
//                 name:'用户管理',
//                 url:'backhome.user'
//             }]
//         },
//         {
//             id:5,
//             name:'后台管理',
//             sub:[
//                 {
//                     id:9,
//                     name:'账户管理',
//                     url:'backhome.account'
//                 },
//                 {
//                     id:10,
//                     name:'角色管理',
//                     url:'backhome.role'
//                 },
//                 {
//                     id:11,
//                     name:'修改密码',
//                     url:'backhome.modify'
//                 },
//                 {
//                     id:12,
//                     name:'模块管理',
//                     url:'backhome.module'
//                 }
//             ]
//         }
//     ]
// )
