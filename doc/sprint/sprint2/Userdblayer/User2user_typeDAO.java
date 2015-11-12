package ms.zui.datamodel.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

import ms.zui.datamodel.domain.User2user_type; 

public interface User2user_typeDAO extends CrudRepository<User2user_type,Integer>{
	public List<User2user_type> findByUtid(int utid);
    public User2user_type findByPhoneid(int phoneid);
    public boolean existsByUtid(int utid);
    public boolean existsByPhone(int phone);
    @SuppressWarnings("unchecked")
	public User2user_type save(User2user_type ut);
    public void delete(User2user_type ut);
    public void deleteAll();
}
