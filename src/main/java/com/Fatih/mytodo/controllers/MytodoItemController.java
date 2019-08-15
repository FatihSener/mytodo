package com.Fatih.mytodo.controllers;

import com.Fatih.mytodo.entities.MytodoItem;
import com.Fatih.mytodo.services.MytodoItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/v1/mytodo-item")
public class MytodoItemController {

    @Autowired
    MytodoItemService mytodoItemService;

    @RequestMapping(value = "", method = RequestMethod.POST)
    public @ResponseBody
    MytodoItem createMytodoItem(@RequestBody MytodoItem mytodoItem) {
        return MytodoItemService.save(mytodoItem);
    }


}
