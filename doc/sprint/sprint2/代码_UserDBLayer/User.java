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
 * @author gaoce
 * @version $Id: User.java, v 0.1 2015年10月28日 下午7:00:37 gaoce Exp $
 * CREATE TABLE IF NOT EXISTS `mydb`.`user` (
 * `phoneid` INT NOT NULL,
 * `gender` TINYINT(1) NOT NULL,
 * `last_name` VARCHAR(45) NOT NULL,
 *`first_name` VARCHAR(45) NULL,
 * `email` VARCHAR(45) NULL,
 * `photo` BLOB NOT NULL,
 * `memo` TEXT NOT NULL,
 * PRIMARY KEY (`phoneid`))
 *ENGINE = InnoDB;
 */
@Entity
@Table(name = "user")
public class User {
    @Id
    @NotNull
    @Column(name = "phoneid")
    private int phoneid;

    @Column(name = "email")
    @NotNull
    private String email;


    @Column(name = "gender")
    @NotNull
    private Boolean gender;

    @Column(name = "first_name")
    @NotNull
    private String first_name;

    @Column(name = "last_name")
    @NotNull
    private String last_name;

    @Column(name = "photo")
    @NotNull
    private byte photo[];
    
    @Column(name = "memo")
    @NotNull
    private String memo;

    public User() {
    }

    public User(String name,int id) {
    	this.first_name = name;
        this.phoneid = id;
    }

    // Getter and setter methods

    public int getPhoneid() {
        return phoneid;
    }

    public void setPhoneid(int value) {
        this.phoneid = value;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String value) {
        this.email = value;
    }

    public Boolean getGender() {
        return gender;
    }
    public void setGender(Boolean value) {
        this.gender = value;
    }
    public String getFirst_name() {
        return first_name;
    }
    public void setFirst_name(String value) {
        this.first_name = value;
    }
    public String getLast_name() {
        return last_name;
    }
    public void setLast_name(String value) {
        this.last_name = value;
    }
    public byte[] getPhoto() {
        return photo;
    }
    public void setPhoto(byte[] value) {
        for(int i=0;i<value.length;i++){
            this.photo[i] = value[i];
        }
    }
    public String getMemo() {
        return memo;
    }
    public void setMemo(String value) {
        this.memo = value;
    }
}
