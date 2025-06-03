import { Customer } from 'src/modules/customers/entities/customer.entity';
import { AppDataSource } from '../../data-source';

import { v4 as uuidv4 } from 'uuid';
import { Product } from 'src/modules/products/entities/product.entity';
import { ProductCategory } from 'src/modules/products/types/products.types';

async function runSeed() {
  await AppDataSource.initialize();

  console.log('🌱 Iniciando seed...');

  const customerRepo = AppDataSource.getRepository(Customer);
  const productRepo = AppDataSource.getRepository(Product);

  await customerRepo.save({
    id: uuidv4(),
    email: 'visitante@example.com',
    name: 'VISITANTE',
    cpf: '12345678900',
  });

  const products: Partial<Product>[] = [
    {
      id: uuidv4(),
      name: 'Cheeseburger Clássico',
      description: 'Pão, hambúrguer 120g, queijo, ketchup e mostarda.',
      price: 12.9,
      category: ProductCategory.LANCHE,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cheeseburger.jpg/250px-Cheeseburger.jpg',
    },
    {
      id: uuidv4(),
      name: 'Pudim de Leite Condensado',
      description: 'Delicioso pudim de leite condensado, cremoso e suave.',
      price: 19.9,
      category: ProductCategory.SOBREMESA,
      image:
        'https://swiftbr.vteximg.com.br/arquivos/ids/202903-1500-1000/616283-pudim-de-leite--condensado_1.jpg',
    },
    {
      id: uuidv4(),
      name: 'Batata Frita Média',
      description: 'Porção média de batata frita crocante.',
      price: 7.5,
      category: ProductCategory.ACOMPANHAMENTO,
      image:
        'https://bobs.com.br/media/filer_public_thumbnails/filer_public/ec/ae/ecaeaf83-664c-4efe-8f12-031994af33c5/batata-palito-m-g.png__800x400_subsampling-2.png',
    },
    {
      id: uuidv4(),
      name: 'Refrigerante 500ml',
      description: 'Escolha entre Coca-Cola, Guaraná ou Fanta.',
      price: 5.0,
      category: ProductCategory.BEBIDA,
      image:
        'https://www.additiva.com.br/upload/blog/wxyzHL8ZfdbDThEOMHHfVx6cVgetzqaGG6CxOPjZ.jpeg',
    },
  ];

  await productRepo.save(products);

  console.log('✅ Seed finalizado!');
  process.exit(0);
}

runSeed().catch((err) => {
  console.error('❌ Erro no seed:', err);
  process.exit(1);
});
