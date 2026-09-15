package com.sporekart.media.internal.repository;

import com.sporekart.media.internal.model.MediaAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MediaAssetRepository extends JpaRepository<MediaAsset, Long> {

    List<MediaAsset> findByEntityTypeAndEntityId(String entityType, Long entityId);

    List<MediaAsset> findByEntityType(String entityType);

    Optional<MediaAsset> findByFilePath(String filePath);
}
