# Spring-Boot ile Veritabanı İşlemleri

Merhaba, bu yazımda sizlerle spring-boot üzerinde MySQL kullanarak nasıl basit veritabanı işlemleri gerçekleştirebileceğimizi anlatmaya çalışıcam.

## Gereksinimler
[Spring Initializr](https://start.spring.io/) üzerinden gerekli bağımlılıklarımızı eklememiz gerekiyor. Eklememiz gereken bağımlılıklar **Spring Web, Spring Data JPA, MySQL Driver, Lombok.** 




## Dosya Yapısı
Bu anlatımda **src/main** iceriği dışında herhangi bir değişiklik yapılmayacağından dolayı **src/main** dosya yapısı aşağıdaki gibi olacaktır. 

    📦main  
     ┣ 📂java  
     ┃ ┗ 📂springboot  
     ┃ ┃ ┗ 📂crud  
     ┃ ┃ ┃ ┣ 📂controller  
     ┃ ┃ ┃ ┃ ┗ 📜kitapController.java  
     ┃ ┃ ┃ ┣ 📂model  
     ┃ ┃ ┃ ┃ ┗ 📜kitaplar.java  
     ┃ ┃ ┃ ┣ 📂repo  
     ┃ ┃ ┃ ┃ ┗ 📜KitapRepository.java  
     ┃ ┃ ┃ ┣ 📜CrudApplication.java  
     ┃ ┃ ┃ ┗ 📜ServletInitializer.java  
     ┗ 📂resources  
     ┃ ┣ 📂static  
     ┃ ┣ 📂templates  
     ┃ ┗ 📜application.properties
			 
##  Veritabanının Oluşturulması
phpMyAdmin kullandığımdan dolayı veritabanımı oluşturdum. **kitaplar** isminde aşağıdaki yapıya sahip bir tablo oluşturdum.
![enter image description here](https://lh3.googleusercontent.com/XQdDoOTDI9GVYycU4yv2Mj0plkShA1HzOh39tZG2ZcHPx35lhKL28klB6Iv2jm6J2R4IaHVzhA6lKSN_gdKjEQ6FCvR7I43wCySTMWFOwwfTbwy3ilQAhx2m1qELHXn5VD0tL6iD-3W7-vA4s3pqfpWgCu4zku-HV9fbvdM-82Njz4_KunTCrLH17l1zzxByxVht2Or0-AMtCxOciFmg0sc_J53FMEnbBpoweq3tebxLZ4cmKPgyxBvxsOkttMQv8DEE-Iv_W3-L5DxuGE-Hw7O4n013Xv9XpEDxxZ3tPyaFC4xMWOBvaGQJGxfPwvC6t1IUVTselwW8z_JmWOjtgCcwRHtDUrLdY-IAGgdpZG-YbD7h7M8h2XcY10N0vcxoBOIXCgMXVPD-8fabPWTDpH_Ir4QxVe851ad4zrSuwTvA4ezjH9vdRuuRCbkGIDal1uVyTY46vhXXSc7xWJou8_AJEnu7FpP5VsQwmwhkd6IJJMr2rctzKDzqCBt6_iyQEXGxw4SNgd0htJ-ECcYKbYA13CuSvt8ZFB49NRug-0JMkD2Tu3-VMrSq509v6bGOK7J_1V0ewztuOV7zdwvX9Jy0UHlfBxP5oG5CcQsyZsOoTBKpFxUPCWaYSSdSjgSBvIOMEBVhEkKHLouWgXd1mz_m9p03NxW9MAdpI66Zuz5QSMfV-h25DMMEp02tGzeFcK02MOt45fVJ7NTwhbKUBXE=w990-h135-no?authuser=0)


## application.properties
application.properties dosyamız ile oluşturduğumuz veritabanımızı projemize bağlamamız gerekiyor. Örnekte olduğu gibi kendi veritabanı adresinizi, kullanıcı adı ve şifrenizi yazarak veritabanınızı projeye dahil edebilirsiniz.

    spring.datasource.url=jdbc:mysql://localhost:3306/spring_crud  
	spring.datasource.username=root  
	spring.datasource.password=

## Model Yapısı

Model yapısı bizim için nesnenin veritabanında tanımlanmış tüm özelliklerini barındırması gereken bir yapıdır. İstenirse projenin yapısı ve gidişatı gibi durumlarda farklı özellikler eklenebilir fakat bizim için aşağıdaki kısım şu an için yeterli olacaktır.
**Lombok** bağımlılığı sayesinde ekstra yazmamız gereken methodların(get,set) bu şekilde önüne geçerek kısa ve okunaklı bir kod yazmamıza yardım ediyor.
```java
package springboot.crud.model;  
 
import lombok.Getter;  
import lombok.Setter;  
import lombok.ToString;  	     
 
import javax.persistence.*;  
import java.sql.Timestamp;  
 
@Entity  
@Getter  
@Setter  
@ToString  
public class kitaplar {  
	@Id  
	@GeneratedValue(strategy = GenerationType.IDENTITY)  
	private Long id;  

	@Column  
	private String kitap_ismi;  

	@Column  
	private String yazar;  

	@Column  
	private Timestamp eklenme_tarihi;  
}
```
## Repository Oluşturulması

Bu projede JpaRepository kullanarak sorgu işlemlerinin büyük bir çoğunluğundan kurtulmak istedim. Eğer dökümantasyonunu inceleyip farklı sorgu yapılarını vs. görmek isterseniz [JPA Repositories](https://docs.spring.io/spring-data/jpa/docs/1.5.0.RELEASE/reference/html/jpa.repositories.html) kısmına gidebilirsiniz.

```java
package springboot.crud.repo;  
  
import org.springframework.data.jpa.repository.JpaRepository;       
import springboot.crud.model.kitaplar;  
  
@Repository  
public interface KitapRepository extends JpaRepository<kitaplar, Long> {  
  
}
```

## Controller Oluşturulması

Bu yazıda basit işlemler yaptığımızdan dolayı service kısmını ekleyip işleri olduğundan daha karmaşık hale getirmek istemedim. Service yapısının gereksiz olduğu anlamına gelmiyor. İnternetten biraz araştırılıp service yapısının hangi durumlarda kullanıldığını rahatça görebilirsiniz. 
```java
package springboot.crud.controller;  
  
import lombok.RequiredArgsConstructor;  
import org.springframework.web.bind.annotation.*;  
import springboot.crud.model.kitaplar;  
import springboot.crud.repo.KitapRepository;  
  
import java.util.List;  
import java.util.Optional;  
  
@RestController  
@RequestMapping("/")  
@RequiredArgsConstructor  
public class kitapController {  
  
	    private final KitapRepository kitapRepository;  

	    @GetMapping("/list")  
	    public List<kitaplar> kitapList() {  
		return kitapRepository.findAll();  
	    }  

	    @GetMapping("/list/{id}")  
	    public Optional<kitaplar> id_kitap_getir(@PathVariable Long id) {  
		return kitapRepository.findById(id);  
	    }  

	    @PostMapping("/ekle")  
	    public kitaplar kitapEkle(kitaplar ekle_kitap){  
		return kitapRepository.save(ekle_kitap);  
	    }  

	    @PostMapping("/sil/{id}")  
	    public boolean kitapSil(@PathVariable Long id){  
		kitapRepository.deleteById(id);  
		return true;  
	    }  
  
}
```

