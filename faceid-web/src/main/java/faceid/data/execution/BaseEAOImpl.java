package faceid.data.execution;

import faceid.data.entity.BaseEntity;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Root;
import java.util.List;

@Stateless(name = "faceid-BaseEAOImpl")
@Local(BaseEAO.class)
public class BaseEAOImpl implements BaseEAO {
    @PersistenceContext(unitName = "userPU")
    private EntityManager em;

    @Override
    public CriteriaBuilder getCriteriaBuilder() {
        return this.em.getCriteriaBuilder();
    }

    @Override
    public <T> TypedQuery<T> createQuery(CriteriaQuery<T> cq) {
        return this.em.createQuery(cq);
    }

    @Override
    public <E> E execute(DbCommand<E> cmd) {
        return cmd.execute(this);
    }

    @Override
    public <E extends BaseEntity> E create(E entity) {
        this.em.persist(entity);
        this.em.flush();
        return entity;
    }

    @Override
    public <E extends BaseEntity> void delete(E entity) {
        this.em.remove(entity);
    }

    @Override
    public <E extends BaseEntity> E find(Class<E> cls, Long uid) {
        return this.em.find(cls, uid);
    }

    @Override
    public <E extends BaseEntity> List<E> findAll(Class<E> cls) {
        final CriteriaBuilder cb = this.getCriteriaBuilder();
        final CriteriaQuery<E> cq = cb.createQuery(cls);
        final Root<E> root = cq.from(cls);
        final TypedQuery<E> q = em.createQuery(cq);
        return q.getResultList();
    }

    @Override
    public <E extends BaseEntity> List<Long> findAllUids(Class<E> cls) {
        final CriteriaBuilder cb = this.getCriteriaBuilder();
        final CriteriaQuery<Long> cq = cb.createQuery(Long.class);
        final Root<E> root = cq.from(cls);
        final Path path = root.get("uid");
        cq.select(path);
        final TypedQuery<Long> q = em.createQuery(cq);
        return q.getResultList();
    }
}
