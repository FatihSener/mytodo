package com.Fatih.mytodo.repositories;

import com.Fatih.mytodo.entities.MytodoItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MytodoItemRepository extends JpaRepository<MytodoItem,Long> {
}
