/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.soa.util;

import com.lianzt.util.impl.SeqUtilImpl;
import org.springframework.stereotype.Component;

/**
 *
 * @author zuotai
 */
@Component
public class JavawebUtil implements SeqUtilImpl {

    @Override
    public String getSerialNumber() {
        return SystemUtil.getSerialNum();
    }
}
