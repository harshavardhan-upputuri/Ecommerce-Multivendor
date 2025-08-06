package com.harsha.service;

import java.util.List;

import com.harsha.model.HomeCategory;

public interface HomeCategoryService {
    
    HomeCategory createHomeCategory(HomeCategory homeCategory);
    List<HomeCategory> createCategories(List<HomeCategory> homeCategories);
    HomeCategory updateHomeCategory(HomeCategory homeCategory,Long id) throws Exception;
    List<HomeCategory> getAllHomeCategories();
}
