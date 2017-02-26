/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soa.service.busi.test;

import com.lianzt.commondata.AbstractCommonData;
import com.lianzt.util.StringUtil;
import com.soa.anno.Validate;
import com.soa.service.BaseService;
import com.soa.vali.impl.ValidatePlugin;
import org.springframework.stereotype.Service;

/**
 * S90001
 * 测试服务01
 * @author zuotai
 */
@Service
public class HelloServiceTest extends BaseService {

    @Validate
    public ValidatePlugin loginValiPlus;

    @Override
    public String[] keys() {
        return null;
    }

    @Override
    public void execute(AbstractCommonData in, AbstractCommonData out) {
        out.putStringValue("str", "hello service");
        if (StringUtil.notNull(in.getStringValue("timeout"))) {
            try {
                Thread.sleep(in.getIntValue("timeout") * 1000);
            } catch (Exception e) {
            }
        }
    }
}
