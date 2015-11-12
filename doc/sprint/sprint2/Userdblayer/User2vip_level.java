package ms.zui.datamodel.domain;

import java.sql.Date;

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
 * @version $Id: User-vip_level.java, v 0.1 
 *
 *CREATE TABLE IF NOT EXISTS `mydb`.`user-vip_level` (
 * `phoneid` INT NOT NULL,
 * `vlid` INT NOT NULL,
 * `start_date` DATE NOT NULL,
 * `end_date` DATE NOT NULL,
 * PRIMARY KEY (`phoneid`, `vlid`),
 * INDEX `vlid_idx` (`vlid` ASC),
 * CONSTRAINT `phoneid`
 *   FOREIGN KEY (`phoneid`)
 *   REFERENCES `mydb`.`user` (`phoneid`)
 *   ON DELETE NO ACTION
 *   ON UPDATE NO ACTION,
 * CONSTRAINT `vlid`
 *   FOREIGN KEY (`vlid`)
 *   REFERENCES `mydb`.`vip_level` (`vlid`)
 *   ON DELETE NO ACTION
 *   ON UPDATE NO ACTION)
 * ENGINE = InnoDB;
 *
 *
 */
@Entity
@Table(name = "user-vip_level")
public class User2vip_level {
    @Id
    @NotNull
    @Column(name = "vlid")
    private int vlid;

    @Id
    @NotNull
    @Column(name = "phoneid")
    private int phoneid;

    @Column(name = "start_date")
    @NotNull
    private Date start_date;

    @Column(name = "end_date")
    @NotNull
    private Date end_date;

    public int getVlid() {
        return vlid;
    }

    public void setVlid(int value) {
        this.vlid = value;
    }

    public int getPhoneid() {
        return phoneid;
    }

    public void setPhoneid(int value) {
        this.phoneid = value;
    }

    public Date getStart_date() {
        return start_date;
    }

    public void setStart_date(Date value) {
        this.start_date = value;
    }

    public Date getEnd_date() {
        return end_date;
    }

    public void setEnd_date(Date value) {
        this.end_date = value;
    }
}