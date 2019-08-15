package com.Fatih.mytodo.services;

import com.Fatih.mytodo.entities.MytodoItem;

import java.util.List;

public interface MytodoItemService {

    public static MytodoItem save(MytodoItem mytodoItem) {
        return null;
    }

    public List<MytodoItem> findAll();

    public void delete(long mytodoItemId);

    public MytodoItem update(long mytodoItemId, MytodoItem mytodoItem);

}
