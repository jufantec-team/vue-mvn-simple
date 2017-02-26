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
 * 修改用户
 * P90002
 * @author zuotai
 */
@Service
public class UpdateUserTest extends BaseService {

    private final String[] KEY = {"user_id", "用户id"};

    @Override
    public String[] keys() {
        return KEY;
    }

    @Override
    @Transactional
    public void execute(AbstractCommonData in, AbstractCommonData out) {
        //update pl_user set username=:username[string],name=:name[string],sex=:sex[string],age=:age[int],status=:status[string] where user_id=:user_id[string]
        update("update_user_test", in);
    }
}
