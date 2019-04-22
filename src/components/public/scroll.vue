<template>
    <div class="scroll-wrapper" ref="wrapper">
        <div class="scroll-main">
            <!-- 顶部提示信息 -->
            <div class="top-tip">
                <div class="refresh-top">
                    <span v-show="IsRefresh" class="icon-jiazai"></span>
                    <span class="refresh-hook">下拉刷新</span>
                </div>
            </div>

            <slot></slot>

            <div class="bottom-tip">
                <span v-show="IsLoading" class="icon-jiazai"></span>
                <span class="loading-hook">查看更多</span>
            </div>
        </div>
        <div class="refresh-success alert-hook">刷新成功</div>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';

    export default {
        props: {
            /**
             * 1 滚动的时候会派发scroll事件，会截流。
             * 2 滚动的时候实时派发scroll事件，不会截流。
             * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
             */
            probeType: {
                type: Number,
                default: 1
            },
            /**
             * 点击列表是否派发click事件
             */
            click: {
                type: Boolean,
                default: true
            },
            /**
             * 是否开启横向滚动
             */
            scrollX: {
                type: Boolean,
                default: false
            },
            /**
             * 是否派发滚动事件
             */
            listenScroll: {
                type: Boolean,
                default: false
            },
            /**
             * 列表的数据
             */
            data: {
                type: Array,
                default: null
            },
            /**
             * 标识列表的数据是否为空
             */
            flag: {
                type: Boolean,
                default: false
            },
            /**
             * 是否派发滚动到底部的事件，用于上拉加载
             */
            pullup: {
                type: Boolean,
                default: false
            },
            /**
             * 是否派发顶部下拉的事件，用于下拉刷新
             */
            pulldown: {
                type: Boolean,
                default: false
            },
            /**
             * 是否派发列表滚动开始的事件
             */
            beforeScroll: {
                type: Boolean,
                default: false
            },
            /**
             * 当数据更新后，刷新scroll的延时。
             */
            refreshDelay: {
                type: Number,
                default: 20
            }
        },
        data() {
            return {
                IsRefresh: false,
                IsLoading: false
            };
        },
        mounted() {
            // 保证在DOM渲染完毕后初始化better-scroll
            setTimeout(() => {
                this._initScroll();
            }, 20);
        },
        methods: {
            _initScroll() {
                if (!this.$refs.wrapper) {
                    return;
                }
                // better-scroll的初始化
                this.scroll = new BScroll(this.$refs.wrapper, {
                    probeType: this.probeType,
                    click: this.click,
                    scrollX: this.scrollX
                });

                // 是否派发滚动事件
                if (this.listenScroll) {
                    this.scroll.on('scroll', (pos) => {
                        this.$emit('scroll', pos);
                    });
                }

                // 是否派发滚动到底部事件，用于上拉加载
                if (this.pullup) {
                    this.scroll.on('scrollEnd', () => {
                        // 滚动到底部
                        if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                            this.$emit('scrollToEnd');
                        }
                    });
                }

                // 是否派发顶部下拉事件，用于下拉刷新
                if (this.pulldown) {
                    this.scroll.on('touchEnd', (pos) => {
                        // 下拉动作
                        if (pos.y > 50) {
                            this.$emit('pulldown');
                        }
                    });
                }

                // 是否派发列表滚动开始的事件
                if (this.beforeScroll) {
                    this.scroll.on('beforeScrollStart', () => {
                        this.$emit('beforeScroll');
                    });
                }
            },
            disable() {
                // 代理better-scroll的disable方法
                this.scroll && this.scroll.disable();
            },
            enable() {
                // 代理better-scroll的enable方法
                this.scroll && this.scroll.enable();
            },
            refresh() {
                // 代理better-scroll的refresh方法
                this.scroll && this.scroll.refresh();
            },
            scrollTo() {
                // 代理better-scroll的scrollTo方法
                this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
            },
            scrollToElement() {
                // 代理better-scroll的scrollToElement方法
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
            },
            refreshTip() {
                let topTip = document.querySelector('.refresh-hook');
                topTip.innerText = '释放立即刷新';
                this.IsRefresh = true;
            },
            refreshAlert(text) {
                let alert = document.querySelector('.alert-hook');
                text = text || '操作成功';
                alert.innerHtml = text;
                alert.style.display = 'block';
                setTimeout(function () {
                    alert.style.display = 'none';
                }, 1000);
            },
            loadData() {
                let topTip = document.querySelector('.refresh-hook');
                topTip.innerText = '下拉刷新';
                this.IsRefresh = false;
                this.refreshAlert('刷新成功');
            },
            shanglajiazai() {
                let bottomTip = document.querySelector('.loading-hook');
                bottomTip.innerText = '加载中...';
                this.IsLoading = true;
                setTimeout(() => {
                    if (!this.flag) {
                        bottomTip.innerText = '查看更多';
                        this.$emit('getData');
                    } else {
                        bottomTip.innerText = '没有更多数据';
                    }
                    this.IsLoading = false;
                }, 1000);
            }
        },
        watch: {
            // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
            data() {
                setTimeout(() => {
                    this.refresh();
                }, this.refreshDelay);
            }
        }
    };
</script>
<style lang="scss" scoped="">
    .scroll-wrapper {
        font-size: .14rem;
        .scroll-main {
            .top-tip {
                position: absolute;
                top: -40px;
                left: 0;
            }
            .bottom-tip {
                .loading-hook {
                    vertical-align: middle;
                }
            }
        }
        .refresh-success {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 2;
            width: 100%;
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: #ffffff;
            background-color: rgba(7,17,27,.5);
        }
    }
</style>