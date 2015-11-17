package ms.zui.datamodel.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import ms.zui.datamodel.domain.User;
import ms.zui.datamodel.domain.Vip_level;

public interface Vip_levelDAO extends CrudRepository<Vip_level,Integer>{
	public Vip_level findByVlid(int vlid);
    public Vip_level findByVlname(String vlname);
    public boolean exists(int vlid);
    @SuppressWarnings("unchecked")
	public Vip_level save(Vip_level us);
    public void delete(Vip_level us);
    public void deleteAll();
}
