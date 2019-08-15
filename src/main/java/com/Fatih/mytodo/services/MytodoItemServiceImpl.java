package com.Fatih.mytodo.services;

import com.Fatih.mytodo.entities.MytodoItem;
import com.Fatih.mytodo.repositories.MytodoItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MytodoItemServiceImpl implements MytodoItemService {

    @Autowired
    MytodoItemRepository mytodoItemRepository;


    @Override
    public MytodoItem save(MytodoItem mytodoItem) {
        return this.mytodoItemRepository.save(mytodoItem);
    }

    @Override
    public List<MytodoItem> findAll() {
        return mytodoItemRepository.findAll();
    }

    @Override
    public void delete(long mytodoItemId) {
        mytodoItemRepository.delete(mytodoItemId);
    }

    @Override
    public MytodoItem update(long todoItemId, MytodoItem mytodoItem) {

        MytodoItem mytodoItemToUpdate = mytodoItemRepository.findOne(mytodoItemId);

        mytodoItemToUpdate.setDescription(mytodoItem.getDescription());

        return this.save(mytodoItemToUpdate);

    }
}
