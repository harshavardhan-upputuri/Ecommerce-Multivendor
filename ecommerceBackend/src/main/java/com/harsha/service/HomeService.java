package com.harsha.service;

import java.util.List;

import com.harsha.model.Home;
import com.harsha.model.HomeCategory;

public interface HomeService {
    
    public Home createHomePageData(List<HomeCategory> allCategories);

    
}
