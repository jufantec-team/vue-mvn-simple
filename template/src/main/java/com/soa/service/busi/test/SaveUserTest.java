/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soa.service.busi.test;

import com.lianzt.commondata.AbstractCommonData;
import com.lianzt.factory.AESFactory;
import com.soa.exception.GlobalException;
import com.soa.service.BaseService;
import com.soa.util.SystemUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 添加用户
 * P90001
 * @author zuotai
 */
@Service
public class SaveUserTest extends BaseService {

    private final String[] KEY = {"username", "用户名",
                                  "password", "密码",
                                  "name", "姓名",
                                  "sex", "性别",
                                  "age", "年龄"};

    @Override
    public String[] keys() {
        return KEY;
    }

    @Override
    @Transactional
    public void execute(AbstractCommonData in, AbstractCommonData out) {
        //insert into pl_user (user_id,username,password,name,sex,age,status,create_date) values (:user_id[string],:username[string],:password[string],:name[string],:sex[string],:age[int],'1',sysdate)
        Object[] args = new Object[6];
        args[0] = SystemUtil.getSerialNum();
        args[1] = in.getStringValue("username");
        try {
            args[2] = AESFactory.encryptString(in.getStringValue("password"));
        } catch (Exception e) {
            throw GlobalException.create("encode_pws_test", e);        //密码加密异常
        }
        args[3] = in.getStringValue("name");
        args[4] = in.getStringValue("sex");
        args[5] = in.getIntValue("age");
        update("save_user_test", args);
        out.putStringValue("user_id", args[0].toString());
    }
}
