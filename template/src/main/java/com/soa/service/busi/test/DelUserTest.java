/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soa.service.busi.test;

import com.lianzt.commondata.AbstractCommonData;
import com.soa.service.BaseService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * P90003
 * 删除用户
 * @author zuotai
 */
@Service
public class DelUserTest extends BaseService {

    private final String[] KEY = {"user_id", "用户id"};

    @Override
    public String[] keys() {
        return KEY;
    }

    @Override
    @Transactional
    public void execute(AbstractCommonData in, AbstractCommonData out) {
        //delete pl_user where user_id=:user_id[string]
        update("del_user_test", in.getStringValue("user_id"));
    }
}
