export function mockFetch() {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
    })
  );
}
