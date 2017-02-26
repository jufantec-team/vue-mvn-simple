/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soa.service.busi.test;

import com.lianzt.commondata.AbstractCommonData;
import com.soa.anno.Validate;
import com.soa.exception.GlobalException;
import com.soa.service.BaseService;
import com.soa.vali.impl.ValidatePlugin;
import org.springframework.stereotype.Service;

/**
 * S90002
 * 检查用户名是否重复
 * @author zuotai
 */
@Service
public class CheckUsernameTest extends BaseService {

    @Validate
    public ValidatePlugin loginValiPlus;
    private final String[] KEY = {"username", "用户名"};

    @Override
    public String[] keys() {
        return KEY;
    }

    @Override
    public void execute(AbstractCommonData in, AbstractCommonData out) {
        //select * from pl_user where username=:username[string]
        AbstractCommonData user = queryData("get_user_test", in);
        if (user != null && !user.isEmpty()) {
            throw GlobalException.create("user_exist_test");        //用户名已存在！
        }
    }
}
