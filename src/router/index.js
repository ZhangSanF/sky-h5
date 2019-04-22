import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {path: '/', redirect: '/home'},
        {path: '*', redirect: '/'},
        {path: '/log_in', component: () => import('@/views/log_in')},
        {path: '/home/system_maintanence', component: () => import('@/views/question_page/systemMaintanence')}, //缺省页面
        {path: '/home', component: () => import('@/views/Home'),
            children: [
                {path: '', redirect: '/home/home_center'},
                {path: '/home/home_center', component: () => import('@/views/home_center'),},
                {path: '/home/home_pay', component: () => import('@/views/pay/pay_index'),},
                {path: '/home/home_unpay', component: () => import('@/views/unpay/home_unpay'),},
                {path: '/home/home_mine', component: () => import('@/views/my/my_index'),},
                {path: '/home/home_mine_money', component: () => import('@/views/my/my_money'),},
                {path: '/home/money', component: () => import('@/views/my/money'),}, //new钱包记录
                {path: '/home/money/info', component: () => import('@/views/my/money_info'),}, //钱包记录详情
                {path: '/home/home_mine_msg', component: () => import('@/views/my/my_msg'),},
                {path: '/home/home_mine_betSet', component: () => import('@/views/my/my_bet')},
                {path: '/home/home_mine_msg/msg_detail', component: () => import('@/views/my/msg_notice_detail')},
                {path: '/home/home_mine_msg/news_detail', component: () => import('@/views/my/msg_news_detail')},
                {path: '/home/sports_event_balls', component: () => import('@/views/home_sports_event/sports_balls'),//滚球赛事
                    children: [
                        {name: 'ballsfootball', path: '/', component: () => import('@/components/balls/footBall'),},//足球
                        {name: 'ballsbaseball', path: 'base_ball', component: () => import('@/components/balls/baseBall')},//棒球
                        {name: 'ballsbasketball', path: 'basket_ball', component: () => import('@/components/balls/basketBall')},//篮球
                        {name: 'ballsotherball', path: 'other_ball', component: () => import('@/components/balls/otherBall')},//其他
                        {name: 'ballstennisball', path: 'tennis_ball', component: () => import('@/components/balls/tennisBall')},//网球
                        {name: 'ballsvolleyball', path: 'volley_ball', component: () => import('@/components/balls/volleyBall')},//排球
                    ]
                },
                {path: '/home/sports_event_today', component: () => import('@/views/home_sports_event/sports_today'),//今日赛事
                    children: [
                        {name: 'todayfootball', path: '/', component: () => import('@/components/balls/footBall'),},//足球
                        {name: 'todaybaseball', path: 'base_ball', component: () => import('@/components/balls/baseBall')},//棒球
                        {name: 'todaybasketball', path: 'basket_ball', component: () => import('@/components/balls/basketBall')},//篮球
                        {name: 'todayotherball', path: 'other_ball', component: () => import('@/components/balls/otherBall')},//其他
                        {name: 'todaytennisball', path: 'tennis_ball', component: () => import('@/components/balls/tennisBall')},//网球
                        {name: 'todayvolleyball', path: 'volley_ball', component: () => import('@/components/balls/volleyBall')},//排球
                  ]
                },

                {path: '/home/sports_event_sessionDetail', component: () => import('@/views/home_sports_event/sports_sessionDetail'), //早盘详细页面
                    children: [
                        {name: 'morningfootball', path: '/', component: () => import('@/components/balls/footBall'),},//足球
                        {name: 'morningbaseball', path: 'base_ball', component: () => import('@/components/balls/baseBall')},//棒球
                        {name: 'morningbasketball', path: 'basket_ball', component: () => import('@/components/balls/basketBall')},//篮球
                        {name: 'morningotherball', path: 'other_ball', component: () => import('@/components/balls/otherBall')},//其他
                        {name: 'morningtennisball', path: 'tennis_ball', component: () => import('@/components/balls/tennisBall')},//网球
                        {name: 'morningvolleyball', path: 'volley_ball', component: () => import('@/components/balls/volleyBall')},//排球
                    ]
                },
                {path: '/home/football_play', component: () => import('@/views/more_play/football_play'),},//足球玩法
                {path: '/home/basketball_play', component: () => import('@/views/more_play/basketball_play'),},//篮球玩法
                {path: '/home/baseball_play', component: () => import('@/views/more_play/baseball_play'),},//棒球玩法
                {path: '/home/tennisball_play', component: () => import('@/views/more_play/tennisball_play'),},//网球玩法
                {path: '/home/volleyball_play', component: () => import('@/views/more_play/volleyball_play'),},//排球玩法
                {path: '/home/otherball_play', component: () => import('@/views/more_play/otherball_play'),},//其他玩法
                {path: '/home/log_in/reg_now', component: () => import('@/views/reg_now')}, //注册页面
                {path: '/home/result', component: () => import('@/views/home_regulation/result'),//赛果页面
                    children: [
                        {name: 'footballResult', path: '/', component: () => import('@/components/result/footballResult'),},//足球赛果
                        {name: 'baseballResult', path: 'baseball_result', component: () => import('@/components/result/baseballResult'),},//棒球赛果
                        {name: 'basketballResult', path: 'basketball_result', component: () => import('@/components/result/basketballResult'),},//篮球赛果
                        {name: 'otherballResult',path: 'otherball_result', component: () => import('@/components/result/otherballResult'),},//其他赛果
                        {name: 'tennisballResult', path: 'tennisball_result', component: () => import('@/components/result/tennisballResult'),},//网球赛果
                        {name: 'volleyballResult', path: 'volleyball_result', component: () => import('@/components/result/volleyballResult')
                        },//排球赛果
                    ]
                },
                {path: '/home/privacy', component: () => import('@/views/home_regulation/privacy')}, //隐私页面
                {path: '/home/rule', component: () => import('@/views/home_regulation/rule')}, //规则页面
                {path: '/home/responsibility', component: () => import('@/views/home_regulation/responsibility')}, //博彩责任页面
            ]
        },
        //测试
        // {path: '/testbb', component: () => import('@/components/test')},
    ]
})
