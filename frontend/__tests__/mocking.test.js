function Person(name, foods) {
  this.name = name;
  this.foods = foods;
}

// eslint-disable-next-line func-names
Person.prototype.fetchFavFoods = function() {
  return new Promise((resolve, reject) => {
    // simulating an API
    setTimeout(() => resolve(this.foods), 2000);
  });
};

describe('mocking learning', () => {
  it('mocks a reg function', () => {
    const fetchDogs = jest.fn();
    fetchDogs('snickers');
    expect(fetchDogs).toHaveBeenCalled();
    expect(fetchDogs).toHaveBeenCalledWith('snickers');
    fetchDogs('hugo');
    expect(fetchDogs).toBeCalledTimes(2);
  });

  it('can create a person', () => {
    const me = new Person('wes', ['pizza', 'burgs']);
    expect(me.name).toBe('wes');
  });

  it('can fetch foods', async () => {
    const me = new Person('wes', ['pizza', 'burgs']);
    // mock the favFoods function
    me.fetchFavFoods = jest.fn().mockResolvedValue(['pizza', 'ramen']);
    const favFoods = await me.fetchFavFoods();
    expect(favFoods).toContain('pizza');
  });
});
