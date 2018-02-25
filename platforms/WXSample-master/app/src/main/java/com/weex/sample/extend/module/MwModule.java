package com.weex.sample.extend.module;

import android.os.Build;

import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.common.WXModule;
import com.taobao.weex.http.WXStreamModule;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by XSY-WORK on 2017/12/25.
 */

public class MwModule extends WXModule {

    @JSMethod(uiThread = false)
    public void getInfo(JSCallback callback) {
        Map<String, Object> infos = new HashMap<>();
        infos.put("String","同步");
//        infos.put("flag",true);
//        infos.put("info", new MessageInfo(true,"同步"));
        callback.invoke(infos);
    }

    @JSMethod(uiThread = true)
    public void getInfoAsync(JSCallback callback) {
        Map<String, Object> infos = new HashMap<>();
        infos.put("String","同步");
        infos.put("flag",true);
        infos.put("info", new MessageInfo(true,"异步"));
        callback.invoke(infos);
    }
}
