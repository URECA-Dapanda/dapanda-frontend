import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DataRegistModal from '@/feature/data/components/sections/modal/DataRegistModal';
import { rest } from 'msw';
import { server } from '@/mocks/server';
import { ToastContainer } from 'react-toastify';
import '@testing-library/jest-dom';

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

jest.mock('next/navigation', () => {
  return {
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      prefetch: jest.fn(),
    }),
  };
});

const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
      <ToastContainer />
    </QueryClientProvider>
  );
};

describe('📤 DataRegistModal - 데이터 판매 등록', () => {
  const user = userEvent.setup();
  const onClose = jest.fn();
  const defaultValues = {
    amount: 1,
    price: 8000,
    isSplitType: false,
    productId: 0,
  };

  it('정상적인 입력 시 등록 후 모달 닫힘', async () => {
    server.use(
      rest.post('/api/products/mobile-data', (_, res, ctx) =>
        res(ctx.status(200), ctx.json({ code: 0, message: '등록 완료!' }))
      )
    );

    renderWithClient(<DataRegistModal onClose={onClose} defaultValues={defaultValues} />);

    const priceInput = screen.getByPlaceholderText('예: 8000');
    await user.clear(priceInput);
    await user.type(priceInput, '8000');

    const button = screen.getByRole('button', { name: /등록하기/i });
    await user.click(button);

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });

  it('가격이 0이면 등록 안되고 에러 토스트 노출', async () => {
    renderWithClient(<DataRegistModal onClose={onClose} defaultValues={defaultValues} />);

    const priceInput = screen.getByPlaceholderText('예: 8000');
    await user.clear(priceInput);
    await user.type(priceInput, '0');

    const button = screen.getByRole('button', { name: /등록하기/i });
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText(/유효한 가격을 입력해주세요/i)).toBeInTheDocument();
    });
  });

  it('서버 에러 발생 시 에러 메시지 표시', async () => {
    server.use(
      rest.post('/api/products/mobile-data', (_, res, ctx) =>
        res(ctx.status(400), ctx.json({ code: 4004, message: '서버 오류' }))
      )
    );

    renderWithClient(<DataRegistModal onClose={onClose} defaultValues={defaultValues} />);

    const priceInput = screen.getByPlaceholderText('예: 8000');
    await user.clear(priceInput);
    await user.type(priceInput, '7000');

    const button = screen.getByRole('button', { name: /등록하기/i });
    await user.click(button);

    await waitFor(() => {
        expect(screen.getByText(/Request failed with status code 400/i)).toBeInTheDocument();
      });
      
  });

  it('문자 입력 시 숫자만 입력 가능해야 함', async () => {
    renderWithClient(<DataRegistModal onClose={onClose} defaultValues={defaultValues} />);
    const input = screen.getByPlaceholderText('예: 8000');
    await user.clear(input);
    await user.type(input, 'abc123xyz');
    await waitFor(() => {
      expect((input as HTMLInputElement).value).toBe('123'); // 숫자만 남음
    });
  });

  it('분할 판매 스위치 켜면 내부 상태 변경됨', async () => {
    renderWithClient(<DataRegistModal onClose={onClose} defaultValues={defaultValues} />);
    const switchButton = screen.getByRole('switch');
    await user.click(switchButton);
    expect(switchButton).toHaveAttribute('aria-checked', 'true');
  });

  it('빠르게 두 번 클릭해도 등록 요청은 한 번만 보내짐', async () => {
    const postHandler = jest.fn((_, res, ctx) =>
      res(ctx.status(200), ctx.json({ code: 0, message: '등록 완료!' }))
    );
    server.use(rest.post('/api/products/mobile-data', postHandler));

    renderWithClient(<DataRegistModal onClose={onClose} defaultValues={defaultValues} />);

    const button = screen.getByRole('button', { name: /등록하기/i });
    await user.click(button);
    await user.click(button);

    await waitFor(() => {
      expect(postHandler).toHaveBeenCalledTimes(1);
    });
  });

  it('빈 문자열 입력 시 등록 안됨', async () => {
    renderWithClient(<DataRegistModal onClose={onClose} defaultValues={defaultValues} />);

    const input = screen.getByPlaceholderText('예: 8000');
    await user.clear(input); // 빈값
    const button = screen.getByRole('button', { name: /등록하기/i });
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText(/유효한 가격을 입력해주세요/i)).toBeInTheDocument();
    });
  });

});
