export const ARGENTINA_CONFIG = {
    // Zonas de envío prioritarias
    shippingZones: {
      villamaria: {
        name: 'Villa María',
        postcodes: ['5900'],
        deliveryTime: '24-48hs',
        cost: 0, // Envío gratis local
      },
      cordobaCapital: {
        name: 'Córdoba Capital',
        postcodes: ['5000', '5001', '5002', '5003', '5004', '5005', '5006', '5007', '5008', '5009', '5010', '5011', '5012', '5013', '5014', '5016', '5017', '5018', '5019', '5020', '5021', '5022'],
        deliveryTime: '2-3 días',
        cost: 5000,
      },
      cordobaProvincia: {
        name: 'Resto de Córdoba',
        deliveryTime: '3-5 días',
        cost: 8000,
      },
      nacional: {
        name: 'Resto del país',
        deliveryTime: '5-10 días',
        cost: 15000,
      }
    },
  
    // Métodos de pago argentinos
    paymentMethods: [
      { id: 'mercadopago', name: 'Mercado Pago', installments: [1, 3, 6, 12] },
      { id: 'transferencia', name: 'Transferencia Bancaria', discount: 10 },
      { id: 'efectivo', name: 'Efectivo en tienda', discount: 15 },
    ],
  
    // Bancos para transferencia
    bankAccounts: [
      {
        bank: 'Banco Macro',
        cbu: '[CBU]',
        alias: '[ALIAS]',
        holder: 'Azul Colchones',
      },
    ],
  
    // SEO Keywords locales
    localKeywords: [
      'colchones villa maría',
      'colchonería villa maría',
      'colchones córdoba',
      'colchones villa maría córdoba',
      'sommier villa maría',
      'donde comprar colchones villa maría',
      'colchones baratos villa maría',
      'colchones premium villa maría',
    ],
  };