/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soa.service.busi.test;

import com.lianzt.commondata.AbstractCommonData;
import com.soa.service.BaseService;
import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Service;

/**
 * S90004
 * 测试打印
 * @author zuotai
 */
@Service
public class PrintPdfTest extends BaseService {

    @Override
    public String[] keys() {
        return null;
    }

    @Override
    public void execute(AbstractCommonData in, AbstractCommonData out) {
        Map parameters = new HashMap();
        parameters.put("title", "测试打印页面");
        parameters.put("content", "用户表数据");
        parameters.put("status", in.getStringValue("status"));
        out.putObjectValue("parameters", parameters);
        out.putStringValue("jasper", "test");
    }
}
