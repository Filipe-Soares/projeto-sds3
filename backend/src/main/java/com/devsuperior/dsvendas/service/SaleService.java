package com.devsuperior.dsvendas.service;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dsvendas.dto.SaleDTO;
import com.devsuperior.dsvendas.entities.Sale;
import com.devsuperior.dsvendas.repositories.SaleRepository;
import com.devsuperior.dsvendas.repositories.SellerRepository;

@Service
public class SaleService {

	@Autowired
	private SaleRepository repository;
	@Autowired
	private SellerRepository sellerRepository;
	
	//@Transactional Para resolver que toda operação do bd seja resolvida tudo no momento do service
	//(readOnly = true) não fazer locking no banco, por ser apenas uma operação de leitura
	@Transactional(readOnly = true) 
	public Page<SaleDTO> findAll(Pageable pageable) {
		//Para buscar os vendedores somente uma vez no BD, deixando-os em cache, recomendável em caso de pouquíssimos objetos
		sellerRepository.findAll();
		Page<Sale>  result = repository.findAll(pageable);
		return result.map(x -> new SaleDTO(x));
	}
}
