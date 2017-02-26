/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soa.service.busi.test;

import com.lianzt.commondata.AbstractCommonData;
import com.soa.service.BaseService;
import com.soa.service.busi.impl.BusiService;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;

/**
 * S90003
 * 查询用户
 * @author zuotai
 */
@Service
public class SearchUserTest extends BaseService {

    @Resource
    private BusiService cutPageOracle;

    @Override
    public String[] keys() {
        return null;
    }

    @Override
    public void execute(AbstractCommonData in, AbstractCommonData out) {
        //select * from pl_user where name like '%'||?||'%' and status=nvl(?,status)
        Object[] args = new Object[2];
        args[0] = in.getStringValue("name");
        args[1] = in.getStringValue("status");
        in.putStringValue("sql", "search_user_test");
        in.putObjectValue("args", args);
        cutPageOracle.execute(in, out);
    }
}
