package ms.zui.datamodel.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

import ms.zui.datamodel.domain.User_type2vip_level;

public interface User_type2vip_levelDAO extends CrudRepository<User_type2vip_levelDAO,Integer>{
	public List<User_type2vip_level> findByUtid(int utid);
    public List<User_type2vip_level> findByVlid(int vlid);
    public List<User_type2vip_level> findByDays(int days);
    public boolean existsByUtid(int utid);
    public boolean existsByVlid(int vlid);
    @SuppressWarnings("unchecked")
	public User_type2vip_level save(User_type2vip_level ut);
    public void delete(User_type2vip_level ut);
    public void deleteAll();
}
