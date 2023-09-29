const ContactForm = () => {
  return (
    <div className="max-w-[760px] w-full mx-auto my-20 sm:mb-28 px-3 sm:px-0">
      <h3 className="text-center font-semibold text-[18px] mb-5 text-pink-900">
        همچنین می‌تونید از طریق این فرم به راحتی با ما در تماس باشید.
      </h3>
      <div>
        <div className="row grid sm:grid-cols-6 gap-3">
          <div className="col-span-6 sm:col-span-2">
            <input
              type="text"
              placeholder="* نام کامل"
              className="input input-bordered focus:input-secondary w-full"
              required
            />
          </div>
          <div className="col-span-6 sm:col-span-2">
            <input
              type="text"
              placeholder="* کشور"
              className="input input-bordered focus:input-secondary w-full"
              required
            />
          </div>
          <div className="col-span-6 sm:col-span-2">
            <input
              type="text"
              placeholder="* شهر"
              className="input input-bordered focus:input-secondary w-full"
              required
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <input
              type="email"
              placeholder="* ایمیل"
              className="input input-bordered focus:input-secondary w-full"
              required
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <input
              type="text"
              placeholder="* موضوع"
              className="input input-bordered focus:input-secondary w-full"
              required
            />
          </div>
          <div className="col-span-6 sm:col-span-6">
            <textarea
              className="textarea input-bordered focus:textarea-secondary w-full"
              placeholder="متن پیام"
              rows={8}
              required
            ></textarea>
          </div>
          <div className="col-span-6 sm:col-span-2 sm:col-start-3">
            <button className="btn btn-outline btn-primary w-full">
              ارسال پیام
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
