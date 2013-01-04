package faceid.data.execution;

import faceid.data.entity.BaseEntity;

import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import java.util.List;

public interface BaseEAO {
    CriteriaBuilder getCriteriaBuilder();

    <T> TypedQuery<T> createQuery(CriteriaQuery<T> cq);

    <E> E execute(DbCommand<E> cmd);

    <E extends BaseEntity> E create(E entity);

    <E extends BaseEntity> void delete(E entity);

    <E extends BaseEntity> E find(Class<E> cls, Long uid);

    <E extends BaseEntity> List<E> findAll(Class<E> cls);

    <E extends BaseEntity> List<Long> findAllUids(Class<E> cls);
}
