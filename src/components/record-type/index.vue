<template>
    <div class="container">
        <div class="nav-bar">
            <div class="type-group">
                <div class="nav-bar-item" :class="[idx==0?'nav-bar-left':'',idx==(types.length-1)?'nav-bar-right':'',defaultType==item.code?'nav-bar-active':'']" @click="changeTab(item)" v-for="(item,idx) in types">
                    <text class="nav-bar-item-text" :class="[defaultType==item.code?'nav-bar-active':'']">{{item.lab}}</text>
                </div>
            </div>
        </div>
        <div class="contents">
            <slider class="contents-slider">
                <div class="contents-page" v-for="group in options">
                    <div class="contents-item" :class="[defaultOption==item.text?'contents-item-active':'']" v-for="item in group" @click="selected(item)">
                        <image class="contents-item-icon" resize="stretch" :src="item.icon"></image>
                        <text class="contents-item-text">{{item.text}}</text>
                    </div>
                </div>
                <indicator class="contents-indicator"></indicator>
            </slider>
        </div>
    </div>
</template>

<style scoped>
    .container{
        width: 750em;
        height: 667em;
        flex-direction: column;
    }
    .nav-bar{
        flex:1;
        justify-content: center;
        align-items: center;
    }
    .type-group{
        width: 480em;
        height: 68em;
        flex-direction: row;
        border-radius: 15em;
    }
    .nav-bar-item{
        flex: 1;
        justify-content: center;
        align-items: center;
        background-color: #FCFCFC;
        border:1pt #B0B0B0 solid;
    }
    .nav-bar-left{
        border-top-left-radius: 15em;
        border-bottom-left-radius: 15em;
        border-right-width: 0;
    }
    .nav-bar-right{
        border-top-right-radius: 15em;
        border-bottom-right-radius: 15em;
        border-left-width: 0;
    }
    .nav-bar-active{
        background-color: #B0B0B0;
        color:#FFFFFF;
    }

    .nav-bar-item-text{
        font-size: 28em;
        text-align: center;
        color: #B0B0B0;
        background-color: #FCFCFC;
    }

    .contents{
        height: 480em;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .contents-slider{
        width: 730em;
        flex: 1;
        margin: 0 10em 10em 10em;
    }
    .contents-page{
        width: 720em;
        flex: 1;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .contents-item{
        width: 125em;
        height: 125em;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding:5em 0;
        margin: 2pt;
    }
    .contents-item-active{
        background-color: #FAEBD7;
    }
    .contents-item-icon{
        width: 64em;
        height: 64em;
    }
    .contents-item-text{
        font-size: 28em;
        text-align: center;
        color: #B0B0B0;
        background-color: rgba(0,0,0,0);
    }
    .contents-indicator {
        position: absolute;
        bottom: 40em;
        width: 750px;
        height: 20px;
        item-color: #E0E0E0;
        item-selected-color: #ff9224;
    }
    .weex-indicator-item-active{
        background-color: #ff9224;
    }
</style>

<script>
    export default {
        props:{
            defaultType:{
                type:String,
                default:'pay'
            },
            defaultOption:{
                type:String,
                default:''
            }
        },
        data(){
            return {
                options:[
                    [{
                        icon:'images/money-001.png',
                        text:'零花'
                    },{
                        icon:'images/money-003.png',
                        text:'储蓄'
                    },{
                        icon:'images/money-004.png',
                        text:'商务'
                    },{
                        icon:'images/money-006.png',
                        text:'购物'
                    },{
                        icon:'images/money-007.png',
                        text:'投资'
                    },{
                        icon:'images/money-008.png',
                        text:'还贷'
                    },{
                        icon:'images/add-001.png',
                        text:'新增'
                    }]
                ],
                types:[{
                    lab:'支出',
                    code:'pay'
                },{
                    lab:'收入',
                    code:'income'
                },{
                    lab:'转账',
                    code:'transfer'
                }]
            }
        },
        methods: {
            changeTab:function (type) {
                this.$emit('changeTab',type.code);
            },
            selected:function (item) {
                console.log(this.defaultOption,item)
                this.$emit('selected',item);
            }
        },
        created:function(){
            
        }
    }
</script>b
