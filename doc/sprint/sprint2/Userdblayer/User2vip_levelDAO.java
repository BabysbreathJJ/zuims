package ms.zui.datamodel.dao;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;

import ms.zui.datamodel.domain.User2vip_level;

public interface User2vip_levelDAO extends CrudRepository<User2vip_level,Integer>{
	public User2vip_level findByPhoneid(int phoneid);
    public User2vip_level findByVlid(int vlid);
    public List<User2vip_level> findByStart_date(Timestamp start_date);
    public List<User2vip_level> findByEnd_date(Timestamp end_date);
    public boolean existsByUtid(int utid);
    public boolean existsByPhone(int phone);
    @SuppressWarnings("unchecked")
	public User2vip_level save(User2vip_level ut);
    public void delete(User2vip_level ut);
    public void deleteAll();

}
