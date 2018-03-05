package com.weex.sample;

import android.widget.ImageView;

import com.bumptech.glide.Glide;
import com.taobao.weex.adapter.IWXImgLoaderAdapter;
import com.taobao.weex.common.WXImageStrategy;
import com.taobao.weex.dom.WXImageQuality;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by lixinke on 16/6/1.
 */
public class ImageAdapter implements IWXImgLoaderAdapter {


  @Override
  public void setImage(String url, ImageView view, WXImageQuality quality, WXImageStrategy strategy) {
    //实现你自己的图片下载。
    Pattern pat=Pattern.compile("^/+");
    Matcher mat=pat.matcher(url);
    url = mat.replaceAll("");
    String path = "file:///android_asset/"+url;
    Glide.with(view.getContext()).load(path).into(view);
  }
}
