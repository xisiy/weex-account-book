package com.weex.sample.extend.module;

/**
 * Created by XSY-WORK on 2017/12/25.
 */

public class MessageInfo {
    private boolean success;
    private String result;

    public MessageInfo(boolean success,String result){
        this.success = success;
        this.result = result;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }
}
