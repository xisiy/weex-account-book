let navigator = weex.requireModule('navigator')
var modal = weex.requireModule('modal')
export default {
    methods: {
        jump (path) {
            if(!path){
                return;
            }
            if(weex.config.env.platform.toLowerCase()=="web"){
                this.$router.push(path);
            }else{
                let url = 'local:'+(/^\//.test(path)?path:'/'+path);
                modal.toast({
                    message: url
                })
                navigator.push({
                    url: url,
                    animated: "true"
                }, event => {
                    modal.toast({ message: 'callback: ' + event })
                })
            }
        }
    }
};