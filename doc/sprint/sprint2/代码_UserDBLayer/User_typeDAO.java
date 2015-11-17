package ms.zui.datamodel.dao;

import javax.transaction.Transactional;

import ms.zui.datamodel.domain.User_type;

import org.springframework.data.repository.CrudRepository;

public interface User_typeDAO extends CrudRepository<User_type,Integer>{
	public User_type findByUtid(int utid);
    public User_type findByUtname(String utname);
    public boolean exists(String utname);
    public boolean exists(int utid);
    @SuppressWarnings("unchecked")
	public User_type save(User_type ut);
    public void delete(User_type ut);
    public void deleteAll();
}

