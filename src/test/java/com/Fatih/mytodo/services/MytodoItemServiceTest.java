package com.Fatih.mytodo.services;

import com.Fatih.mytodo.entities.MytodoItem;
import com.Fatih.mytodo.repositories.MytodoItemRepository;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import static org.hamcrest.Matchers.equalTo;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class MytodoItemServiceTest {

    @InjectMocks
    MytodoItemServiceImpl subject;

    @Mock
    MytodoItemRepository mytodoItemRepository;

    public void testSaveShouldReturnTodoItem() {
        final MytodoItem mytodoItem = new MytodoItem();
        mytodoItem.setDescription("This is a task");

        final MytodoItem mytodoItemResponse = new MytodoItem();
        mytodoItemResponse.setId(100L);
        mytodoItemResponse.setDescription("This is a task");

        when(mytodoItemRepository.save(mytodoItem)).thenReturn(mytodoItemResponse);

        final MytodoItem response = subject.save(mytodoItem);
        assertThat(response.getId(), equalTo(100L));
        assertThat(response.getDescription(), equalTo("This is a task"));
        
    }

}
