describe('sample test 101', () => {
  it('works as expected', () => {
    expect(1).toStrictEqual(1);
  });

  it('handles ranges just fine', () => {
    const age = 200;
    expect(age).toBeGreaterThan(100);
  });

  it('makes a list of dog names', () => {
    const dogs = ['snickers', 'hugo'];
    expect(dogs).toContain('snickers');
  });
});
