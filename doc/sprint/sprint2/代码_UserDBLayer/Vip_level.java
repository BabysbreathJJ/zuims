package ms.zui.datamodel.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 * User实体类
 * 
 * @author Xin
 * @version $Id: Vip_level.java, v 0.1 
 *
 *CREATE TABLE IF NOT EXISTS `mydb`.`vip_level` (
 * `vlid` INT NOT NULL,
 * `vl_name` VARCHAR(45) NOT NULL,
 * PRIMARY KEY (`vlid`))
 *ENGINE = InnoDB;
 *
 *
 */
@Entity
@Table(name = "vip_level")
public class Vip_level {
    @Id
    @NotNull
    @Column(name = "vlid")
    private int vlid;

    @Column(name = "vl_name")
    @NotNull
    private String vl_name;

    public int getVlid() {
        return vlid;
    }

    public void setVlid(int value) {
        this.vlid = value;
    }

    public String getVl_name() {
        return vl_name;
    }

    public void setVl_name(String value) {
        this.vl_name = value;
    }
}