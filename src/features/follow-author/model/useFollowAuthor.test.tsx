import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks'
import * as api from '../api';
import { useFollowAuthor } from "./useFollowAuthor";
import { ApiError } from "../../../shared/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import toast from "react-hot-toast";

jest.mock('../api');

jest.mock('react-hot-toast', () => ({
  error: jest.fn(),
}))


const mockedFollowUser = api.followUser as jest.Mock;
const mockedUnfollowUser = api.unfollowUser as jest.Mock;

const createQueryProviderWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        retry: false
      }
    },
  })

  function QueryWrapper({ children }: { children: React.ReactNode }): JSX.Element {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  }

  return QueryWrapper;
}

describe('useFollowAuthor', () => {
  let onSuccessMock: jest.Mock
  let renderedHook: any

  beforeEach(() => {
    jest.clearAllMocks();

    mockedFollowUser.mockResolvedValue(undefined);
    mockedUnfollowUser.mockResolvedValue(undefined);

    onSuccessMock = jest.fn();
    renderedHook = renderHook(() => useFollowAuthor(onSuccessMock),
      {
        wrapper: createQueryProviderWrapper()
      }
    )
  });

  it('should follow user when following is false', async () => {
    act(() => {
      renderedHook.result.current.handleFollow({
        username: 'test-user',
        following: false
      });
    });

    await renderedHook.waitFor(() => {
      expect(mockedFollowUser).toHaveBeenCalledWith('test-user')
      expect(onSuccessMock).toHaveBeenCalledTimes(1);
    });
  });

  it('should unfollow user when following is true', async () => {
    act(() => {
      renderedHook.result.current.handleFollow({
        username: 'test-user',
        following: true
      });
    });

    await renderedHook.waitFor(() => {
      expect(mockedUnfollowUser).toHaveBeenCalledWith('test-user')
      expect(onSuccessMock).toHaveBeenCalledTimes(1);
    });
  });



  it('should try to follow user but throw an API error', async () => {
    mockedFollowUser.mockRejectedValueOnce(
      new ApiError(400, { message: ['Bad request'] })
    );

    act(() => {
      renderedHook.result.current.handleFollow({
        username: 'test-user',
        following: false
      });
    });

    await renderedHook.waitFor(() => {
      expect(onSuccessMock).not.toHaveBeenCalled();
      expect(mockedFollowUser).toHaveBeenCalledWith('test-user');
      expect(toast.error).toHaveBeenCalledWith('Failed to follow author');
    })
  });

});
