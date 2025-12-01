import { MercadoPagoConfig, Preference } from 'mercadopago';
import { NextRequest, NextResponse } from 'next/server';

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(request: NextRequest) {
  try {
    const { items, payer } = await request.json();

    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: items.map((item: any) => ({
          title: item.name,
          quantity: item.quantity,
          unit_price: item.price,
          currency_id: 'ARS',
        })),
        payer: {
          name: payer.name,
          email: payer.email,
          phone: {
            area_code: '353',
            number: payer.phone,
          },
          address: {
            street_name: payer.address,
            zip_code: payer.zipCode,
          },
        },
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success`,
          failure: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/failure`,
          pending: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/pending`,
        },
        auto_return: 'approved',
        payment_methods: {
          installments: 12,
          default_installments: 3,
        },
        statement_descriptor: 'AZUL COLCHONES',
        external_reference: `ORDER-${Date.now()}`,
      },
    });

    return NextResponse.json({ preferenceId: result.id });
  } catch (error) {
    console.error('Error creating preference:', error);
    return NextResponse.json(
      { error: 'Error al procesar el pago' },
      { status: 500 }
    );
  }
}