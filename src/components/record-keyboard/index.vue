<template>
    <div class="container">
        <div class="contents">
            <text class="contents-text"></text>
            <div class="contents-details">
                <div class="contents-tag">
                    <text class="contents-tag-text">现金</text>
                </div>
                <div class="contents-tag">
                    <text class="contents-tag-text">今天</text>
                </div>
                <div class="contents-mark"><text class="contents-mark-text">{{cache.showValue}}</text></div>
            </div>
        </div>
        <div class="keyboard">
            <div class="keyboard-type">
                <div class="type-tag" :class="[defaultType==item.code?'type-tag-active':'']" @click="changeTab(item)" v-for="(item,idx) in types">
                    <text class="type-text" :class="[defaultType==item.code?'type-tag-active':'']">{{item.lab}}</text>
                </div>
            </div>
            <div class="keyboard-btn-group">
                <div class="keyboard-btn" :class="item.css" @click="input(item)" v-for="item in keyNumbers">
                    <text class="keyboard-btn-text" :class="item.labCss">{{item.lab}}</text>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .container{
        width:750em;
        height: 667em;
        flex-direction: column;
    }
    .contents{
        flex:1;
        flex-direction: column;
        margin: 10em;
    }
    .contents-text{
        flex: 1;
        margin: 0 10em;
        color: #FF9224;
        background-color: rgba(0,0,0,0);
    }
    .contents-details{
        flex: 1;
        margin: 0 10em;
        border-radius: 20em;
        background-color: #E0E0E0;
        flex-direction: row;
        align-items: center;
    }
    .contents-tag{
        height: 65em;
        justify-content: center;
        align-items: center;
        margin-left: 10em;
        padding:0 15em;
        border-radius: 10em;
        background-color: #FF9224;
    }
    .contents-tag-text{
        font-size: 28em;
        color: #FFFFFF;
    }
    .contents-mark{
        flex:1;
        justify-content: center;
        align-items: flex-end;
        margin-right: 20px;
    }
    .contents-mark-text{
        font-size: 32em;
        color: #FF9224;
    }

    .keyboard{
        height:480em;
        flex-direction: row;
        background-color: #FCFCFC;
    }
    .keyboard-type{
        width: 150em;
        flex-direction: column;
    }
    .type-tag{
        flex:1;
        justify-content:center;
        align-items: center;
        border-bottom:1pt #B0B0B0 solid;
        background-color: #E0E0E0;
    }
    .type-tag-active{
        background-color:#FCFCFC;
        color: #FF9224;
    }
    .keyboard-btn-group{
        width: 600em;
        flex-direction: row;
        flex-wrap: wrap
    }
    .keyboard-btn{
        height: 120em;
        justify-content: center;
        align-items: center;
    }
    .col-1{
        width: 150em;
    }
    .col-2{
        width: 300em;
    }
    .keyboard-btn-text{
        text-align: center;
        font-size: 40em;
        color: #000000;
    }
    .submit-btn{
        background-color: #5B5B5B;
    }
    .submit-text{
        color: #FFF;
    }
    .backspace-btn{
        background-color: #FFE4CA;
    }
</style>

<script>
    export default {
        props:{
            defaultType:{
                type:String,
                default:'pay'
            }
        },
        data(){
            return {
                cache:{
                    showValue:'',
                    value:'',
                    transferValue:''
                },
                types:[{
                    lab:'支出',
                    code:'pay'
                },{
                    lab:'收入',
                    code:'income'
                },{
                    lab:'转账',
                    code:'transfer'
                }],
                keyNumbers:[{
                    code:7,
                    lab:'7',
                    css:['col-1']
                },{
                    code:8,
                    lab:'8',
                    css:['col-1']
                },{
                    code:9,
                    lab:'9',
                    css:['col-1']
                },{
                    code:10,
                    lab:'←',
                    css:['col-1','backspace-btn']
                },{
                    code:4,
                    lab:'4',
                    css:['col-1']
                },{
                    code:5,
                    lab:'5',
                    css:['col-1']
                },{
                    code:6,
                    lab:'6',
                    css:['col-1']
                },{
                    code:11,
                    lab:'+',
                    css:['col-1']
                },{
                    code:1,
                    lab:'1',
                    css:['col-1']
                },{
                    code:2,
                    lab:'2',
                    css:['col-1']
                },{
                    code:3,
                    lab:'3',
                    css:['col-1']
                },{
                    code:12,
                    lab:'-',
                    css:['col-1']
                },{
                    code:13,
                    lab:'.',
                    css:['col-1']
                },{
                    code:0,
                    lab:'0',
                    css:['col-1']
                },{
                    code:14,
                    lab:'√',
                    css:['col-2','submit-btn'],
                    labCss:['submit-text']
                }]
            }
        },
        methods: {
            changeTab:function (type) {
                this.$emit('changeTab',type.code);
            },
            input:function(item){
                let isTransfer = this.defaultType=='transfer';
                console.log(this.cache.showValue);
                if(isTransfer){

                }else{
                    if(item.code<10){
                        this.cache.showValue = '' + this.cache.showValue + item.code;
                        return;
                    }
                    if(this.cache.showValue.length==0){
                        return;
                    }
                    if(item.code==14){
                        let numberArry = this.cache.showValue.match(/\d+/g);
                        let operatorArry = this.cache.showValue.match(/[^\d]/g);
                        let amounts = 0;
                        let start = true;
                        while(numberArry.length>0){
                            if(start){
                                start = false;
                                amounts = Number(numberArry[0]);
                                numberArry = numberArry.splice(1);
                            }
                            amounts = operatorArry[0] == this.keyNumbers[7].lab?amounts + Number(numberArry[0]):amounts - Number(numberArry[0]);
                            numberArry = numberArry.splice(1);
                            operatorArry = operatorArry.splice(1);
                        }
                        this.cache.showValue = '';
                        this.$emit('input', amounts);
                        return;
                    }
                    if(item.code == 10){
                        this.cache.showValue = this.cache.showValue.slice(0,-1);
                        return;
                    }
                    this.cache.showValue = /[^\d]$/.test(this.cache.showValue)? this.cache.showValue.slice(0,-1)+item.lab:this.cache.showValue + item.lab;
                }
            }
        },
        created:function(){
        }
    }
</script>b
