package com.Fatih.mytodo.controllers;


import com.Fatih.mytodo.entities.MytodoItem;
import com.Fatih.mytodo.services.MytodoItemService;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import static org.hamcrest.Matchers.equalTo;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class MytodoItemControllerTest {

    @InjectMocks
    MytodoItemControllerTest subject;

    @Mock
    MytodoItemService mytodoItemService;

    @Test
    public void testCreatedMytodoItemReturnsSavedTodoItem() {
        final MytodoItem mytodoItemRequest  = new MytodoItem();
        final MytodoItem mytodoItemResponse = new MytodoItem();
        mytodoItemResponse.setId(100L);

        when(MytodoItemService.save(mytodoItemRequest)).thenReturn(mytodoItemResponse);

        assertThat(subject.createMytodoItem(mytodoItemRequest).getId(), equalTo(100L));
    }

    //*
    private MytodoItem createMytodoItem(MytodoItem mytodoItemRequest) {
        return null;
    }

}
