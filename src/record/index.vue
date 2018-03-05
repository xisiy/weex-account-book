<template>
    <list class="record">
        <cell class="record-item">
            <image class="record-cover" resize="stretch" src="images/cover.png"></image>
            <div class="record-tips">
                <text class="record-tips-text">下拉进入主页</text>
            </div>
            <div class="record-top-btn">
                <text class="record-top-btn-text">主页</text>
            </div>
        </cell>
        <cell>
            <record-type :default-type="typeCode" :default-option="selectedOption" @selected="selected" @changeTab="changeTab"></record-type>
        </cell>
        <cell>
            <record-keyboard :default-type="typeCode" @changeTab="changeTab" @input="input"></record-keyboard>
        </cell>
    </list>
</template>

<style>
    .record{
        height:1334em;
        background-color: #F8F8F8;
    }
    .record-item{
        height: 667em;
        justify-content: center;
        align-items: center;
    }
    .record-cover{
        width:750em;
        height: 600em;
    }
    .record-tips{
        flex: 1;
        justify-content: center;
        align-items: center;
    }
    .record-tips-text{
        font-size: 24em;
        text-align: center;
        color: #B0B0B0;
    }
    .record-top-btn{
        width: 125em;
        height: 40em;
        position: absolute;
        top:10em;
        right: 0;
        z-index: 2;
        justify-content: center;
        border-top-left-radius: 20em;
        border-bottom-left-radius: 20em;
    }
    .record-top-btn-text{
        font-size: 28em;
        text-align: center;
        background-color: #E0E0E0;
        border-top-left-radius: 20em;
        border-bottom-left-radius: 20em;
    }
</style>

<script>
    import recordType from 'components/record-type'
    import recordKeyboard from 'components/record-keyboard'
    export default {
        components:{
            recordType,
            recordKeyboard
        },
        data(){
            return {
                typeCode:'pay',
                selectedOption:'',
                amounts:0
            }
        },
        methods: {
            changeTab:function (typeCode) {
                this.typeCode = typeCode;
            },
            selected:function (item) {
                this.selectedOption = item.text;
            },
            input:function(value){
                this.amounts = value
            }
        },
        created:function(){
        }
    }
</script>b
